import { FC, useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IssueType, Priority } from '../../../shared/model/common';
import Select from '../../../shared/components/Select';
import { priorityTypes } from '../../../shared/PriorityTypes';

interface Props {
  onChange: (id: string) => void;
  onBlur?: () => void;
  value: string;
}

export const SelectPriority: FC<Props> = ({ onChange, value, onBlur }) => {
  
  return (
    <Select
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    >
      {priorityTypes.map((item) => (
        <MenuItem value={item.id} key={item.id} sx={{ px: '8px' }}>
          <ListItemIcon sx={{ minWidth: '24px !important', width: '24px !important' }}>{item.img}</ListItemIcon>
          <ListItemText sx={{ pl: '8px' }} primaryTypographyProps={{ variant: 'label', color: 'text.secondary' }}>
            {item.title}
          </ListItemText>
        </MenuItem>
      ))}
    </Select>
  );
};
