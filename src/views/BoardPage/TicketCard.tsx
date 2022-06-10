import {FC} from 'react';
import Box from '@mui/material/Box';
import DefaultProps from '../../shared/model/DefaultProps';
import Avatar from '@mui/material/Avatar';
import {styled} from '@mui/material/styles';

const issueTypeIcons: Record<string, JSX.Element> = {
  bug: (
    <svg fill="red" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M20 8h-2.81a5.985 5.985 0 00-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path>
    </svg>
  ),
  task: (
    <svg fill="green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-3.06 16L7.4 14.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L10.94 18zM13 9V3.5L18.5 9H13z"></path>
    </svg>
  ),
  story: (
    <svg fill="blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" d="M0 0H24V24H0z"></path>
      <path d="M18 11c1.49 0 2.87.47 4 1.26V8c0-1.11-.89-2-2-2h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h7.68A6.995 6.995 0 0118 11zm-8-7h4v2h-4V4z"></path>
      <path d="M18 13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm1.65 7.35L17.5 18.2V15h1v2.79l1.85 1.85-.7.71z"></path>
    </svg>
  ),
};
const issuePriorityTypes: Record<string, JSX.Element> = {
  lowest: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
    </svg>
  ),
  low: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
    </svg>
  ),
  medium: (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </svg>
  ),
  hight: (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </svg>
  ),
};
const Wrapper = styled('div')(({theme}) => ({
  backgroundColor: theme.board.ticketBg,
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
      border: `1px solid ${theme.board.ticketBg}`,
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
  console.log(props);
  const {text, assigned, issueId, type, priority} = props;
  return (
    <Wrapper>
      <div className="text">{text}</div>
      <div className="controls">
        <div className="user-avatars">
          {assigned.map((url) => (
            <div className="user-avatar-item">
              <Avatar alt="James Bond" src={''}></Avatar>
            </div>
          ))}
        </div>
        <div className="issue-id">{issueId}</div>
        <div className="filler"></div>
        <div className="issue-type">{issueTypeIcons[type]}</div>
        <div className="issue-priority">{issuePriorityTypes[priority]}</div>
      </div>
    </Wrapper>
  );
};
