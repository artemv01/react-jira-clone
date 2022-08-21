import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SvgIcon from '@mui/material/SvgIcon';

import { priorityTypes } from '../../../shared/PriorityTypes';
import { Priority } from '../../../shared/model/common';

interface Props {
  priorityId: string;
}

export const PriorityBadge: FC<Props> = ({ priorityId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Wrapper = styled(Menu)(({ theme }) => ({
    '& .MuiTypography-root': {
      fontSize: '14px',
      paddingLeft: theme.spacing(1),
    },
  }));
  const [selected, setSelected] = useState<Priority>({} as Priority);
  const [priorities, setPriorities] = useState<Priority[]>(priorityTypes);
  const initPriorities = (priorityId: string) => {
    let priorityIdx = priorityTypes.findIndex((item) => item.id === priorityId);
    if (priorityIdx === -1) {
      priorityIdx = 0;
    }
    setSelected(priorityTypes[priorityIdx]);
    setPriorities(priorityTypes.filter((item, idx) => idx !== priorityIdx));
    handleClose();
  };
  useEffect(() => {
    initPriorities(priorityId);
  }, [priorityId]);

  return (
    <div>
      <List onClick={handleClick} disablePadding={true}>
        <ListItem disablePadding>
          <ListItemButton dense={true} selected={true}>
            <ListItemIcon>
              <SvgIcon>{selected.img}</SvgIcon>
            </ListItemIcon>
            <ListItemText
              sx={{ mx: 1 }}
              disableTypography
              primary={
                <Typography component='span' fontSize={14}>
                  {selected.title}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Wrapper id='priority-menu' anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
        <MenuList disablePadding={true}>
          {priorities.map((item) => (
            <MenuItem onClick={() => initPriorities(item.id)} key={item.id}>
              <ListItemIcon>{item.img}</ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Wrapper>
    </div>
  );
};
