import { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import NoSsr from '../../../shared/NoSsr';
import BoardColumn from '../BoardColumn';
import BoardPageControls from '../BoardPageControls';
import Backdrop from '@mui/material/Backdrop';
import IssueCard from '../../issue-card/IssueCard';
import Breadcrumbs from '../../../shared/components/Breadcrumbs';
import TicketCard from '../TicketCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { moveIssue, selectIssues } from '../../../store/issuesSlice';
import { Issue, IssueFilters } from '../../../shared/model/common';
import { users } from '../../../shared/stubs/users';
import { defaultIssueFilters } from '../../../shared/stubs/defaultIssueFilters';

export const ItemTypes = {
  CARD: 'card',
};
const breadcrumbs = ['Projects', 'React Jira Clone', 'Kanban Board'];

export const BoardPage: FC = () => {
  const taskList = useAppSelector(selectIssues);
  const dispatch = useAppDispatch();
  const [openedIssueId, setOpenedIssueId] = useState<string | undefined>();
  const onDragEnd = (val: any) => {
    const { draggableId, source, destination } = val;

    const [sourceGroup] = taskList.filter((column) => column.id === source.droppableId);

    const [destinationGroup] = destination
      ? taskList.filter((column) => column.id === destination.droppableId)
      : [{ ...sourceGroup }];
    const [movingTask] = sourceGroup.items.filter((t) => t.id === draggableId);

    dispatch(
      moveIssue({
        sourceGroupId: sourceGroup.id,
        destGroupId: destinationGroup.id,
        destIdx: destination.index,
        issueId: movingTask.id as string,
      })
    );
  };

  const [filters, setFilters] = useState<IssueFilters>(defaultIssueFilters);

  const applyFilters = (issue: Issue): boolean => {
    const { search, assignees, onlyCurrentUserIssues, ignoreResolved } = filters;
    let matchScore = 0,
      neededScore = 0;
    if (search?.length) {
      neededScore++;
      const searchRegexp = new RegExp(search, 'i');
      if (searchRegexp.test(issue.text) || searchRegexp.test(issue.title)) {
        ++matchScore;
      }
    }
    if (assignees.length) {
      neededScore++;
      const assigneeMatch = assignees.filter((item) => issue.assignee.includes(item)).length;
      if (assigneeMatch) {
        ++matchScore;
      }
    }
    if (onlyCurrentUserIssues) {
      neededScore++;
      const currentUserId = users[0].id;
      if (issue.assignee.includes(currentUserId)) {
        ++matchScore;
      }
    }
    if (ignoreResolved) {
      neededScore++;
      if (issue.status !== 'hyHjZ_SbAXqW6KwLdAp_l') {
        ++matchScore;
      }
    }
    return neededScore === matchScore;
  };

  return (
    <NoSsr>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} open={!!openedIssueId}>
        <IssueCard id={openedIssueId as string} onClose={() => setOpenedIssueId(undefined)}></IssueCard>
      </Backdrop>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Breadcrumbs breadcrumbs={breadcrumbs}></Breadcrumbs>
          <Typography variant='h1' sx={{ mb: 3, mt: 1.5 }}>
            Kanban Board
          </Typography>
          <Box sx={{ mb: 2 }}>
            <BoardPageControls
              onChange={(newFilters) => {
                setFilters(newFilters);
              }}
              value={filters}
            ></BoardPageControls>
          </Box>
          <Box sx={{ flex: '1 1 auto', maxWidth: '1270px' }}>
            <Grid sx={{ height: '100%' }} container spacing={1}>
              {taskList.map((data, index) => {
                return (
                  <Grid item key={data.id} xs={3}>
                    <BoardColumn id={data.id} headerText={data.title + ` ${data.items.length}`}>
                      {data.items.filter(applyFilters).map((issue, i) => (
                        <Draggable key={issue.id} draggableId={issue.id} index={i}>
                          {(provided: any) => (
                            <div
                              key={issue.id}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              onClick={() => setOpenedIssueId(issue.id)}
                            >
                              <TicketCard issue={issue} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </BoardColumn>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </DragDropContext>
    </NoSsr>
  );
};
