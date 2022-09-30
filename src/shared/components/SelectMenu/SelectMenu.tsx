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
import { Option, Priority } from '../../../shared/model/common';
import { useTheme } from '@mui/material/styles';

interface Props {
  onChange: (val: string) => void;
  value: string;
  options: Array<Option>;
  uppercase?: boolean;
}

export const SelectMenu: FC<Props> = ({ options, value, onChange, uppercase }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedItem, setSelectedItem] = useState<Option>({} as Option);
  useEffect(() => {
    console.log(options)
    setSelectedItem(options.find((opt) => opt.value === value) || options[0]);
  }, [value]);

  const theme = useTheme();

  const openMenu = Boolean(anchorEl);
  const handleClick = (event: any) => {
    console.log(event.currentTarget)

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

  const getSelectedColor = () => {
    const selectedOption = selectedItem;
    return getOptionColorSettings(selectedOption);
  };
  const getOptionColorSettings = (option: Option): { backgroundColor: string; color: string } => {
    return {
      backgroundColor: (option?.bgColor || theme.palette.button.primary) + ' !important',
      color: (option?.textColor || theme.palette.text.primary) + ' !important',
    };
  };

  return (
    <div>
      <List onClick={handleClick} disablePadding={true}>
        <ListItem disablePadding>
          <ListItemButton sx={{ ...getSelectedColor() }} dense={true} selected={true}>
            {selectedItem.img && (
              <ListItemIcon>
                <img src={selectedItem.img} alt={selectedItem.name} />
              </ListItemIcon>
            )}
            <ListItemText
              sx={{ mx: 1 }}
              disableTypography
              primary={
                <Typography component='span' fontSize={14} sx={{ textTransform: uppercase ? 'uppercase' : 'none' }}>
                  {selectedItem.name}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Wrapper anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
      {/*   <MenuList disablePadding={true}>
          {options.map((item) => (
            <MenuItem
              onClick={() => {
                onChange(item.value);
                handleClose();
              }}
              key={item.value}
            >
              {item.img && (
                <ListItemIcon>
                  <img src={item.img} alt={selectedItem.name} />
                </ListItemIcon>
              )}
              <ListItemText sx={{ textTransform: uppercase ? 'uppercase' : 'none' }}>{item.name}</ListItemText>
            </MenuItem>
          ))}
        </MenuList> */}
      </Wrapper>
    </div>
  );
};