import { FC, useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '../../../shared/components/Select';
import { users } from '../../../shared/stubs/users';
import Avatar from '@mui/material/Avatar';

interface Props {
  onChange: (id: number) => void;
}

export const SelectUser: FC<Props> = ({ onChange }) => {
  return (
    <Select
      onChange={(newVal: any) => {
        onChange(newVal);
      }}
      defaultValue={users[0].id}
    >
      {users.map((item) => (
        <MenuItem value={item.id} key={item.id} sx={{ px: '8px' }}>
          <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 24, height: 24 }} />
          <ListItemText sx={{ pl: '8px' }} primaryTypographyProps={{ variant: 'body' }}>
            John Johnson
          </ListItemText>
        </MenuItem>
      ))}
    </Select>
  );
};
