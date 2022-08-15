import { FC, useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { issueTypes } from '../../../shared/IssueTypes';
import Select from '../../../shared/components/Select';

interface Props {
  onChange: (id: string) => void;
  value: string;
}

export const SelectType: FC<Props> = ({ onChange, value }) => {
  const [selected, setSelected] = useState(value);
  if (!selected) {
    return <></>;
  }
  return (
    <Select
      onChange={(newVal: any) => {
        setSelected(newVal);
        onChange(newVal);
      }}
      value={selected}
    >
      {issueTypes.map((item) => (
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
