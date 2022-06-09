import {FC, useState} from 'react';
import Typography from '@mui/material/Typography';
import {styled, useTheme, Theme, CSSObject, createTheme, ThemeProvider} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import NoSsr from '../../shared/NoSsr';
import {TicketCard} from './TicketCard';

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

const BoardColumn: FC = ({id, headerText, children}) => {
  const Wrapper = styled('div')(({theme}) => ({
    backgroundColor: theme.board.bg,
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    flexDirection: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }));
  const ItemsContainer = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: '1 1 auto',
    padding: `0 ${theme.spacing(1)}`,

    '& > *': {
      marginBottom: theme.spacing(1),
    },
  }));
  const Header = styled('h1')(({theme}) => ({
    fontSize: 13,
    margin: 0,
    color: theme.palette.text.secondary,
    padding: '12px 12px 16px 12px',
  }));
  return (
    <Wrapper>
      <Header>{headerText}</Header>
      <Droppable droppableId={id}>{(provided: any) => <ItemsContainer ref={provided.innerRef}>{children}</ItemsContainer>}</Droppable>
    </Wrapper>
  );
};

export const BoardPage: FC = (props) => {
  const [taskList, setTasks] = useState(initialData);
  function onDragEnd(val) {
    const {draggableId, source, destination} = val;

    const [sourceGroup] = taskList.filter((column) => column.group === source.droppableId);

    const [destinationGroup] = destination ? taskList.filter((column) => column.group === destination.droppableId) : {...sourceGroup};

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <Typography>Kanban Board</Typography>
          <Box sx={{flex: '1 1 auto', maxWidth: '1270px'}}>
            <Grid sx={{height: '100%'}} container spacing={1}>
              {taskList.map((data, index) => {
                return (
                  <Grid item key={data.id} xs={3}>
                    <BoardColumn id={data.group} headerText={data.title}>
                      {data.items.map(({id, title}, i) => (
                        <Draggable styles={{width: '100%'}} key={id} draggableId={id} index={i}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              styles={{marginBottom: 1, width: '100%'}}
                            >
                              <TicketCard>{title}</TicketCard>
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
