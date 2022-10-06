import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import AddNewAssignee from '../AddNewAssignee';

import 'react-quill/dist/quill.snow.css';

import { Option } from '../../../shared/model/common';
import React from 'react';
import { FC } from 'react';
import { AssigneeMenu } from './AssigneeSelect.styles';
import Button from '../../../shared/components/Button';

interface Props {
  onChange: (newVal: string[]) => void;
  value: string[];
  options: Option[];
}
export const AssigneeSelect: FC<Props> = ({ options, value, onChange }) => {
  const [assigneeBtn, setAssigneeBtn] = useState<null | HTMLElement>(null);
  const addAssigneeRef = useRef(null);
  const assigneeMenuOpen = Boolean(assigneeBtn);
  const handleAddMenuClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setAssigneeBtn(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAssigneeBtn(null);
  };

  const optionClick = (newValue: string) => {
    const result = [...value];
    result.push(newValue);
    onChange([...result]);
    handleAddMenuClose();
  };

  const optionRemove = (removeValue: string) => {
    const idx = value.indexOf(removeValue);
    const result = [...value];
    if (idx !== -1) {
      result.splice(idx, 1);
    }

    onChange([...result]);
  };

  const [selectedOption, setSelectedOption] = useState<Option[]>([]);
  useEffect(() => {
    setSelectedOption(options.filter((item) => value.includes(item.value)));
  }, [value]);

  return (
    <Box>
      <List disablePadding={true}>
        {selectedOption.map((opt, i) => (
          <Button
            key={i}
            startIcon={<Avatar alt={opt.name} src={opt.img} sx={{ width: 20, height: 20 }} />}
            endIcon={<CloseIcon onClick={() => optionRemove(opt.value)} />}
            sx={{
              height: '32px',
              display: 'flex',
              '& .MuiButtonBase-root': { display: 'flex' },
              mb: 1,
              mr: 1,
            }}
          >
            <Typography fontSize='14px' variant='body2' lineHeight='16px'>
              {opt.name}
            </Typography>
          </Button>
        ))}
      </List>
      <AddNewAssignee ref={addAssigneeRef} onClick={handleAddMenuClick} />
      <AssigneeMenu anchorEl={assigneeBtn} open={assigneeMenuOpen} onClose={handleAddMenuClose}>
        <MenuList disablePadding={true}>
          {options
            .filter((item) => !selectedOption.map((selItem) => selItem.value).includes(item.value))
            .map((opt) => (
              <MenuItem key={opt.value} onClick={() => optionClick(opt.value)}>
                <Avatar alt={opt.name} src={opt.img} sx={{ width: 20, height: 20 }} />
                <ListItemText>{opt.name}</ListItemText>
              </MenuItem>
            ))}
        </MenuList>
      </AssigneeMenu>
    </Box>
  );
};
