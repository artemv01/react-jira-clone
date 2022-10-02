import { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import DefaultProps from '../../../shared/model/DefaultProps';
import Avatar from '@mui/material/Avatar';
import { priorityTypes } from '../../../shared/PriorityTypes';
import { issueTypes } from '../../../shared/IssueTypes';
import { Wrapper } from './TicketCard.styles';
import { users } from '../../../shared/stubs/users';
import { Issue, IssueType, Priority, User } from '../../../shared/model/common';
import { IssueRenderData, joinIssueRelations } from '../../../store/issuesSlice';

interface Props {
  issue: Issue;
}

export const TicketCard: FC<Props> = (props) => {
  const issueData: IssueRenderData = joinIssueRelations(props.issue);
  if (!issueData) {
    // TODO (FEATURE): add loading
    return <></>;
  }
  return (
    <Wrapper>
      <div className='text'>{issueData.title}</div>
      <div className='controls'>
        <div className='user-avatars'>
          {issueData.assigned.map((user, index) => (
            <div key={index} className='user-avatar-item'>
              <Avatar alt={user.name} src={user.avatarUrl}></Avatar>
            </div>
          ))}
        </div>
        <div className='issue-id'>{issueData.publicId}</div>
        <div className='filler'></div>
        <div className='issue-type'>
          <img src={issueData.type?.img} alt='' />
        </div>
        <div className='issue-priority'>
          <img src={issueData.priority?.img} alt='' />
        </div>
      </div>
    </Wrapper>
  );
};
