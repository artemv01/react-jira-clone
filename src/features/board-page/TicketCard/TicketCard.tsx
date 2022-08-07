import { FC } from 'react';
import Box from '@mui/material/Box';
import DefaultProps from '../../../shared/model/DefaultProps';
import Avatar from '@mui/material/Avatar';
import { priorityTypes } from '../../../shared/PriorityTypes';
import { issueTypes } from '../../../shared/IssueTypes';
import { Wrapper } from './TicketCard.styles';

interface Props {
  text: string;
  assigned: string[];
  issueId: string;
  type: string;
  priority: string;
  children?: React.ReactNode;
}

export const TicketCard: FC<Props> = (props) => {
  const { text, assigned, issueId } = props;
  return (
    <Wrapper>
      <div className='text'>{text}</div>
      <div className='controls'>
        <div className='user-avatars'>
          {assigned.map((url, index) => (
            <div key={index} className='user-avatar-item'>
              <Avatar alt='James Bond' src={''}></Avatar>
            </div>
          ))}
        </div>
        <div className='issue-id'>{issueId}</div>
        <div className='filler'></div>
        <div className='issue-type'>{issueTypes[0].title}</div>
        <div className='issue-priority'>{priorityTypes[0].img}</div>
      </div>
    </Wrapper>
  );
};
