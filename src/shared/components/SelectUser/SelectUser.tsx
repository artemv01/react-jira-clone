import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { title } from 'process';
import { FC } from 'react';
import { users } from '../../stubs/users';
import { styled } from '@mui/material/styles';

interface Props {
  onChange: (data: string[]) => void;
  value: string[];
}
export const AvatarItem = styled('div')(({ theme }) => ({
  '&:first-of-type': {
    paddingLeft: '6px',
  },
  '& > .MuiAvatar-root': {
    cursor: 'pointer',
    marginLeft: '-6px',
    border: `1px solid ${theme.palette.board.issueBg}`,
    transition: 'all 0.3s ease',
    '&:hover, &.selected': {
      transform: 'translateY(-5px)',
    },
  },
}));
export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  marginRight: '16px',
  marginLeft: '16px',
}));
export const SelectUser: FC<Props> = ({ onChange, value }) => {
  const selectUser = (id: string) => {
    const selected = [...value];
    const selectedIdx = selected.indexOf(id);
    if (selectedIdx !== -1) {
      selected.splice(selectedIdx, 1);
    } else {
      selected.push(id);
    }
    onChange(selected);
  };
  return (
    <Wrapper>
      {users.map((user, index) => (
        <AvatarItem key={index} onClick={() => selectUser(user.id)}>
          <Tooltip title={user.name} placement='bottom'>
            <Avatar
              className={value.includes(user.id) ? 'selected' : ''}
              sx={{ width: 42, height: 42 }}
              src={user.avatarUrl}
            ></Avatar>
          </Tooltip>
        </AvatarItem>
      ))}
    </Wrapper>
  );
};
