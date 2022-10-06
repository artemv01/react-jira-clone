import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import { Wrapper } from './IssueCard.styles';
import { Issue } from '../../../shared/model/common';
import { IssueRenderData, joinIssueRelations } from '../../../store/issuesSlice';

interface Props {
  issue: Issue;
}

export const IssueCard: FC<Props> = (props) => {
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
          <img src={issueData.type?.img} width="22" height="22"  alt='' />
        </div>
        <div className='issue-priority'>
          <img src={issueData.priority?.img}  width="22" height="22" alt='' />
        </div>
      </div>
    </Wrapper>
  );
};
