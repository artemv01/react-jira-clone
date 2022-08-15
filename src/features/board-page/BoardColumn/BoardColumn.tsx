import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import DefaultProps from '../../../shared/model/DefaultProps';
import { Header, ItemsContainer, Wrapper } from './BoardColumn.styles';
interface Props {
  id: string;
  headerText: string;
}
export const BoardColumn: FC<Props & DefaultProps> = (props) => {
  const { id, headerText, children } = props;

  return (
    <Wrapper>
      <Header>{headerText}</Header>
      <Droppable droppableId={id}>
        {(provided: any) => (
          <ItemsContainer ref={provided.innerRef}>
            {children} {provided.placeholder}
          </ItemsContainer>
        )}
      </Droppable>
    </Wrapper>
  );
};
