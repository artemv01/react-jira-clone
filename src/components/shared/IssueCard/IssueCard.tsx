import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import IssueType from '../IssueType';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SvgIcon from '@mui/material/SvgIcon';

import { priorityTypes } from '../../../shared/PriorityTypes';
import { issueTypes } from '../../../shared/IssueTypes';
import IssueHeaderBadge from '../IssueHeaderBadge';
import AddNewAssignee from '../AddNewAssignee';
import PriorityBadge from '../PriorityBadge';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  backgroundColor: theme.palette.board.ticketBg,
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)} 64px ${theme.spacing(2.5)}`,
  width: '100%',
  maxWidth: '1040px',
  '& .editor-col': {
    flex: '1 1 auto',
    marginRight: '40px',
  },
  '& .issue-controls-col': {
    flex: '0 0 333px',
  },
  '& .issue-type-desc': {},
}));

const IssueControlsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'column nowrap',
  '& .issue-control': {
    marginBottom: theme.spacing(3),
    '& .MuiList-root': {
      paddingBottom: 0,
    },
    '& .MuiListItem-root': {
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
      '& .MuiSvgIcon-root': {
        fontSize: '20px',
      },
    },
    '& .MuiListItemIcon-root': {
      width: '24px',
      minWidth: '24px',
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: '10px',
    },
    '& .MuiListItemText-root, & .MuiListItemButton-root ': {
      flex: '0 1 auto',
    },
    '& .MuiListItemButton-root': {
      backgroundColor: theme.palette.button.primary,
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      '&:hover': {
        backgroundColor: theme.palette.button.dark,
      },
    },
  },
  '& .control-title': {},
}));
const AssigneeMenu = styled(Menu)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '14px',
    paddingLeft: theme.spacing(1),
  },
}));
export const IssueCard: FC = () => {
  const theme = useTheme();
  const [assigneeBtn, setAssigneeBtn] = useState<null | HTMLElement>(null);
  const addAssigneeRef = useRef(null);
  const assigneeMenuOpen = Boolean(assigneeBtn);
  const handleAddAssigneeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('haha');
    setAssigneeBtn(event.currentTarget);
  };
  const handleAssigneeMenuClose = () => {
    setAssigneeBtn(null);
  };

  return (
    <Wrapper>
      <div className='editor-col'>
        <IssueHeaderBadge issueId='STG-1234' issueTypeId='bug'></IssueHeaderBadge>
        <div className='issue-type-desc'></div>
        <Typography
          sx={{ mb: 2, mt: 1, '&:hover': { backgroundColor: theme.palette.button.primary }, cursor: 'pointer' }}
          variant='h1'
        >
          How to build Jira clone? Follow these tutorials from its author.{' '}
        </Typography>
        <div className='issue-content'>
          <Typography sx={{ mb: 1 }} variant='body1'>
            Description
          </Typography>
          <Box sx={{ '&:hover': { backgroundColor: theme.palette.button.primary }, cursor: 'pointer' }}>
            <div className='content'>
              After searching for an assignee on the list and clear the text, the option label was missing. It could be
              the bug on the ng-zorro select itself. If you have any idea, feel free to create a pull request.{' '}
            </div>
          </Box>
        </div>
      </div>
      <div className='issue-controls-col'>
        <IssueControlsWrapper>
          <div className='issue-control'>
            <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
              status
            </Typography>
            <div className='control-content'>
              <List disablePadding={true}>
                <ListItem disablePadding>
                  <ListItemButton dense={true} selected={true}>
                    <ListItemText
                      sx={{ mx: 1 }}
                      disableTypography
                      primary={
                        <Typography sx={{ textTransform: 'uppercase' }} component='span' fontSize={14}>
                          in progress
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </div>
          <div className='issue-control'>
            <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
              assignees
            </Typography>
            <div className='control-content'>
              <List disablePadding={true}>
                <ListItem disablePadding={true}>
                  <ListItemButton dense={true} selected={true}>
                    <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                    <ListItemText
                      sx={{ mx: 1 }}
                      disableTypography
                      primary={<Typography fontSize={14}>JamesBond</Typography>}
                    />
                    <ListItemIcon>
                      <CloseIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </List>
              <AddNewAssignee ref={addAssigneeRef} onClick={handleAddAssigneeClick} />
              <AssigneeMenu
                id='assignee-menu'
                anchorEl={assigneeBtn}
                open={assigneeMenuOpen}
                onClose={handleAssigneeMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuList disablePadding={true}>
                  <MenuItem>
                    <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                    <ListItemText>John Johnson</ListItemText>
                  </MenuItem>
                </MenuList>
                <MenuList disablePadding>
                  <MenuItem>
                    <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                    <ListItemText>John Johnson</ListItemText>
                  </MenuItem>
                </MenuList>
                <MenuList disablePadding>
                  <MenuItem>
                    <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                    <ListItemText>John Johnson</ListItemText>
                  </MenuItem>
                </MenuList>
              </AssigneeMenu>
            </div>
          </div>
          <div className='issue-control'>
            <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
              priority
            </Typography>
            <div className='control-content'>
              <PriorityBadge priority={priorityTypes[0]} />
            </div>
          </div>
          <Typography variant='caption' color='text.secondary'>
            Created - Jun 28, 2020, 7:30:00 PM
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Created - Jun 28, 2020, 7:30:00 PM
          </Typography>
        </IssueControlsWrapper>
      </div>
    </Wrapper>
  );
};




