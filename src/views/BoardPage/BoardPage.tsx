import { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import NoSsr from '../../shared/NoSsr';
import { TicketCard } from './TicketCard';
import BoardColumn from './components/BoardColumn';
import { styled } from '@mui/material/styles';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
import BoardPageControls from './components/BoardPageControls';
import Backdrop from '@mui/material/Backdrop';
import IssueCard from '../../components/shared/IssueCard';
const initialData = [
  {
    id: '1',
    group: 'backlog',
    title: 'Backlog',
    items: [
      {
        id: '1',
        title: 'Angular Spotify',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
      {
        id: '2',
        title: 'Angular Spotify',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
    ],
  },
  {
    id: '2',
    group: 'selected_for_dev',
    title: 'Selected for development',
    items: [
      {
        id: '3',
        title: 'When creating an issue, the assignee list is not working properly on searching',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
      {
        id: '4',
        title: 'Preparing backend API with GraphQL - Update 08/2020',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
    ],
  },
  {
    id: '3',
    group: 'in_progress',
    title: 'in progress',
    items: [
      {
        id: '5',
        title: 'Preparing backend API with GraphQL - Update 08/2020',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
      {
        id: '6',
        title: 'Jira Clone Storybook - Update 10/2020',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
    ],
  },
  {
    id: '4',
    group: 'done',
    title: 'done',
    items: [
      {
        id: '7',
        title: 'Behind the 900 stars - Update 08/2020',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
      {
        id: '8',
        title: 'Angular router not working on Netlify on refresh',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
    ],
  },
];

export const ItemTypes = {
  CARD: 'card',
};
const breadcrumbs = ['Projects', 'React Jira Clone', 'Kanban Board'];

export const BoardPage: FC = () => {
  const [taskList, setTasks] = useState(initialData);
  function onDragEnd(val: any) {
    const { draggableId, source, destination } = val;

    const [sourceGroup] = taskList.filter((column) => column.group === source.droppableId);

    const [destinationGroup] = destination
      ? taskList.filter((column) => column.group === destination.droppableId)
      : [{ ...sourceGroup }];

    const [movingTask] = sourceGroup.items.filter((t) => t.id === draggableId);

    sourceGroup.items.splice(source.index, 1);
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
    setTasks(newTaskList);
  }

  return (
    <NoSsr>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} open={true}>
        <IssueCard></IssueCard>
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
