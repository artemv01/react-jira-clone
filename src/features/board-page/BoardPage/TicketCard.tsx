import { FC } from 'react';
import Box from '@mui/material/Box';
import DefaultProps from '../../../shared/model/DefaultProps';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { priorityTypes } from '../../../shared/PriorityTypes';
import { issueTypes } from '../../../shared/IssueTypes';

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.board.ticketBg,
  width: '100%',
  height: 'auto',
  padding: theme.spacing(1),
  minHeight: '80px',
  boxShadow: '#091e4240 0 1px 2px',
  fontSize: '15px',
  lineHeight: '20px',
  display: 'flex',
  flexFlow: 'column nowrap',
  '& > .text': {
    fontSize: '13px',
    lineHeight: '20px',
    marginBottom: theme.spacing(1.5),
  },
  '& > .controls ': {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  '.user-avatars': {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  '.user-avatar-item': {
    '&:first-child': {
      paddingLeft: '4px',
    },
    '& > .MuiAvatar-root': {
      marginLeft: '-4px',
      width: 24,
      height: 24,
      border: `1px solid ${theme.palette.board.ticketBg}`,
    },
  },
  '.issue-id': {
    marginLeft: '12px',
    fontSize: '14px',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
  },
  '.filler': {
    flex: '1 1 auto',
  },
}));

export const TicketCard: FC = (props) => {
  const { text, assigned, issueId, type, priority } = props;
  return (
    <Wrapper>
      <div className='text'>{text}</div>
      <div className='controls'>
        <div className='user-avatars'>
          {assigned.map((url) => (
            <div className='user-avatar-item'>
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
