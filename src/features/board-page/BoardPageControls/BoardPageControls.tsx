import Search from '@mui/icons-material/Search';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';

import { FC, useState, MouseEvent } from 'react';
import { BoardPageControlsWrapper, SearchInput } from './BoardPageControls.styles';

const users = [
  '/images/avatar1.jpg',
  '/images/avatar2.jpg',
  '/images/avatar3.jpg',
  '/images/avatar4.jpg',
  '/images/avatar5.jpg',
];
export const BoardPageControls: FC = () => {
  return (
    <BoardPageControlsWrapper>
      <FormControl size='small' className='search-input' variant='standard'>
        <SearchInput
          id='input-with-icon-adornment'
          startAdornment={
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>
      <div className='user-avatars'>
        {users.map((url, index) => (
          <div key={index} className='user-avatar-item'>
            <Tooltip title='James Bond' placement='bottom'>
              <Avatar src={url}></Avatar>
            </Tooltip>
          </div>
        ))}
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText disableTypography primary={<Typography fontSize={15}>Only My Issues</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText disableTypography primary={<Typography fontSize={15}>Ignore Resolved</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem
          sx={{
            paddingLeft: '12px',
            borderLeft: '1px solid rgba(0,0,0,0.2)',
          }}
          disablePadding
        >
          <ListItemButton selected={true}>
            <ListItemText disableTypography primary={<Typography fontSize={15}>Clear All</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
    </BoardPageControlsWrapper>
  );
};
