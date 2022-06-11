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
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import { FC, useState, MouseEvent } from 'react';

const BoardPageControlsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  '& .search-input': {
    width: '13rem',
  },
  '.user-avatars': {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginRight: '16px',
    marginLeft: '16px',
  },
  '.user-avatar-item': {
    '&:first-child': {
      paddingLeft: '6px',
    },
    '& > .MuiAvatar-root': {
      cursor: 'pointer',
      marginLeft: '-6px',
      width: 36,
      height: 36,
      border: `1px solid ${theme.board.ticketBg}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    },
  },
  '& .MuiList-root': {
    display: 'flex',
    flexFlow: 'row nowrap',
    paddingLeft: '12px',
    paddingRight: '12px',
    '& .MuiListItemButton-root': {
      paddingTop: '4px',
      paddingBottom: '4px',
    },
    '& .MuiTypography-root': {
      whiteSpace: 'nowrap',
      wordBreak: 'break-word',
      fontSize: '14px',
    },
    '& .separator': {
      height: '2rem',
      width: '1px',
      backgroundColor: theme.palette.text.disabled,
      boxSizing: 'content-box',
      marginRight: '12px',
      marginLeft: '12px',
    },
  },
}));

const SearchInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    paddingLeft: '8px',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    fontSize: 16,
    padding: '4px 8px 4px 0px',
  },
  '& MuiInputAdornment-root': {
    marginRight: 0,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
}));
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
