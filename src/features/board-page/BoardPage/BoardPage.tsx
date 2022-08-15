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

export const ItemTypes = {
  CARD: 'card',
};
const breadcrumbs = ['Projects', 'React Jira Clone', 'Kanban Board'];

export const BoardPage: FC = () => {
  const taskList = useAppSelector(selectIssues);
  const dispatch = useAppDispatch();
  const [isIssueCardOpened, setIssueCardOpened] = useState(false);
  function onDragEnd(val: any) {
    const { draggableId, source, destination } = val;

    const [sourceGroup] = taskList.filter((column) => column.group === source.droppableId);

    const [destinationGroup] = destination
      ? taskList.filter((column) => column.group === destination.droppableId)
      : [{ ...sourceGroup }];

    const [movingTask] = sourceGroup.items.filter((t) => t.id === draggableId);
    dispatch(
      moveIssue({
        sourceGroupId: sourceGroup.id,
        destGroupId: destinationGroup.id,
        destIdx: destination.index,
        issueId: movingTask.id,
      })
    );
    /* sourceGroup.items.splice(source.index, 1);
    destinationGroup.items.splice(destination.index, 0, movingTask);

    const newTaskList = taskList.map((column) => {
      if (column.group === source.droppableId) {
        return {
          ...sourceGroup,
          items: sourceGroup.items,
        };
      }
      if (column.group === destination.droppableId) {
        return {
          ...destinationGroup,
          items: destinationGroup.items,
        };
      }
      return column;
    });
    setTasks(newTaskList);*/
  }

  return (
    <NoSsr>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} open={isIssueCardOpened}>
        <IssueCard onClose={() => setIssueCardOpened(false)}></IssueCard>
      </Backdrop>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Breadcrumbs breadcrumbs={breadcrumbs}></Breadcrumbs>
          <Typography variant='h1' sx={{ mb: 3, mt: 1.5 }}>
            Kanban Board
          </Typography>
          <Box sx={{ mb: 2 }}>
            <BoardPageControls></BoardPageControls>
          </Box>
          <Box sx={{ flex: '1 1 auto', maxWidth: '1270px' }}>
            <Grid sx={{ height: '100%' }} container spacing={1}>
              {taskList.map((data, index) => {
                return (
                  <Grid item key={data.id} xs={3}>
                    <BoardColumn id={data.group} headerText={data.title}>
                      {data.items.map(({ id, title }, i) => (
                        <Draggable key={id} draggableId={id} index={i}>
                          {(provided: any) => (
                            <div
                              key={id}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              onClick={() => setIssueCardOpened(true)}
                            >
                              <TicketCard
                                key={id}
                                text={'When creating an issue, the assignee list is not working properly on searching'}
                                assigned={['/images/avatar1.jpg', '/images/avatar2.jpg']}
                                issueId={'SUP-123'}
                                type={'bug'}
                                priority={'low'}
                              >
                                {title}
                              </TicketCard>
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
