import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { Option } from '../../../shared/model/common';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '../Button';
import { Avatar } from '@mui/material';

interface Props {
  onChange: (val: string) => void;
  value: string;
  options: Array<Option>;
  uppercase?: boolean;
  id: string;
  avatarVariant?: 'circular' | 'rounded' | 'square';
}

export const SelectMenu: FC<Props> = ({ options, value, onChange, uppercase, id, avatarVariant }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedItem, setSelectedItem] = useState<Option>({} as Option);
  useEffect(() => {
    setSelectedItem(options.find((opt) => opt.value === value) || options[0]);
  }, [value]);

  const theme = useTheme();

  const openMenu = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getSelectedColor = () => {
    const selectedOption = selectedItem;

    return getOptionColorSettings(selectedOption);
  };

  const getOptionColorSettings = (option: Option): { backgroundColor: string; color: string } => {
    return {
      backgroundColor: (option?.bgColor || theme.palette.button.primary) + ' !important',
      color: (option?.textColor || theme.typography.body2) + ' !important',
    };
  };

  return (
    <>
      <Button
        startIcon={
          selectedItem.img && (
            <Avatar sx={{ width: '22px', height: '22px' }} variant={avatarVariant || 'square'} src={selectedItem.img} />
          )
        }
        onClick={handleClick}
        sx={{
          backgroundColor: getSelectedColor().backgroundColor,
          height: '32px',
          display: 'flex',
          '& .MuiButtonBase-root': { display: 'flex' },
        }}
      >
        <Typography
          fontSize='14px'
          variant='body2'
          lineHeight='16px'
          sx={{ textTransform: uppercase ? 'uppercase' : 'none', color: getSelectedColor().color }}
        >
          {selectedItem.name}
        </Typography>
      </Button>
      <Menu id={id} anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
        <MenuList disablePadding={true}>
          {options.map((item) => (
            <Box
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '14px',
                  paddingLeft: theme.spacing(1),
                },
              }}
              onClick={() => {
                onChange(item.value);
                handleClose();
              }}
              key={item.value}
            >
              <MenuItem>
                {item.img && (
                  <Avatar
                    src={item.img}
                    variant={avatarVariant || 'square'}
                    sx={{ width: '22px', height: '22px' }}
                  ></Avatar>
                )}
                <ListItemText sx={{ textTransform: uppercase ? 'uppercase' : 'none' }}>{item.name}</ListItemText>
              </MenuItem>
            </Box>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
