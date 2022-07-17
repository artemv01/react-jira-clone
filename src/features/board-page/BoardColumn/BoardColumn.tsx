import {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Droppable} from 'react-beautiful-dnd';

import DefaultProps from '../../../shared/model/DefaultProps';
interface Props {
  id: string;
  headerText: string;
}
export const BoardColumn: FC<Props & DefaultProps> = (props) => {
  const {id, headerText, children} = props;
  const Wrapper = styled('div')(
    ({theme}) =>
      ({
        backgroundColor: theme.palette.board.bg,
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        flexDirection: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'center',
      } as any),
  );

  const ItemsContainer = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
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
    textTransform: 'uppercase',
    fontWeight: 400,
  }));
  return (
    <Wrapper>
      <Header>{headerText}</Header>
      <Droppable droppableId={id}>{(provided: any) => <ItemsContainer ref={provided.innerRef}>{children}</ItemsContainer>}</Droppable>
    </Wrapper>
  );
};
