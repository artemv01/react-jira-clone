import { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import DefaultProps from '../../../shared/model/DefaultProps';
import Avatar from '@mui/material/Avatar';
import { priorityTypes } from '../../../shared/PriorityTypes';
import { issueTypes } from '../../../shared/IssueTypes';
import { Wrapper } from './TicketCard.styles';
import { users } from '../../../shared/stubs/users';
import { IssueType, Priority, User } from '../../../shared/model/common';

interface Props {
  text: string;
  assigned: string[];
  issueId: string;
  type: string;
  priority: string;
}
interface IssueRenderData {
  text: string;
  assigned: User[];
  issueId: string;
  type: IssueType;
  priority: Priority;
}
export const TicketCard: FC<Props> = (props) => {
  const issueData: IssueRenderData = useMemo(() => {
    const assigned = users.filter((item) => {
      if (props.assigned.includes(item.id)) {
        return item;
      }
    });
    const priority = priorityTypes.find((item) => {
      if (props.priority === item.id) {
        return item;
      }
    }) as Priority;
    const type = issueTypes.find((item) => {
      if (props.type === item.id) {
        return item;
      }
    }) as IssueType;
    return {
      text: props.text,
      assigned,
      issueId: props.issueId,
      type,
      priority,
    };
  }, [props]);
  if (!issueData) {
    // TODO (FEATURE): add loading
    return <></>;
  }
  return (
    <Wrapper>
      <div className='text'>{issueData.text}</div>
      <div className='controls'>
        <div className='user-avatars'>
          {issueData.assigned.map((user, index) => (
            <div key={index} className='user-avatar-item'>
              <Avatar alt={user.name} src={user.avatarUrl}></Avatar>
            </div>
          ))}
        </div>
        <div className='issue-id'>{issueData.issueId}</div>
        <div className='filler'></div>
        <div className='issue-type'>{issueData.type.img}</div>
        <div className='issue-priority'>{issueData.priority.img}</div>
      </div>
    </Wrapper>
  );
};
