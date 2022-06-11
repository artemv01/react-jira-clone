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

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  backgroundColor: theme.board.ticketBg,
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)} 64px ${theme.spacing(2.5)}`,
  width: '100%',
  maxWidth: '1040px',
  '& .editor-col': {
    flex: '1 1 auto',
    paddingLeft: '40px',
  },
  '& .issue-controls-col': {
    flex: '0 0 333px',
  },
  '& .issue-type-desc': {
    display: 'flex',
    cursor: 'pointer',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    width: 'fit-content',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    marginLeft: `-${theme.spacing(1)}`,
    borderRadius: '4px',
    '& .MuiTypography-root': {
      marginLeft: '8px',
    },
    '&:hover': {
      backgroundColor: theme.button.primary,
    },
  },
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
      backgroundColor: theme.button.primary,
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      '&:hover': {
        backgroundColor: theme.button.dark,
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
  /*  useEffect(() => {
    if (addAssigneeRef?.current) {
      addAssigneeRef.current.click();
    }
  }, [addAssigneeRef]); */
  return (
    <Wrapper>
      <div className='editor-col'>
        <div className='issue-type-desc'>
          <IssueType type={'bug'}></IssueType>
          <Typography fontSize={14} fontWeight='bold'>
            STR-123
          </Typography>
        </div>
        <Typography
          sx={{ mb: 2, '&:hover': { backgroundColor: theme.button.primary }, cursor: 'pointer' }}
          variant='h1'
        >
          How to build Jira clone? Follow these tutorials from its author.{' '}
        </Typography>
        <div className='issue-content'>
          <Typography variant='subtitle1' color='text.secondary'>
            Description
          </Typography>
          <Box sx={{ '&:hover': { backgroundColor: theme.button.primary }, cursor: 'pointer' }}>
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
            <Typography
              className='control-title'
              sx={{ textTransform: 'uppercase', mb: 0.5 }}
              fontWeight='bold'
              color='text.secondary'
              variant='subtitle2'
            >
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
            <Typography
              className='control-title'
              sx={{ textTransform: 'uppercase', mb: 0.5 }}
              fontWeight='bold'
              color='text.secondary'
              variant='subtitle2'
            >
              assignees
            </Typography>
            <div className='control-content'>
              <List>
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
              <AddNewItem ref={addAssigneeRef} onClick={handleAddAssigneeClick} />
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
            <Typography
              className='control-title'
              sx={{ textTransform: 'uppercase', mb: 0.5 }}
              fontWeight='bold'
              color='text.secondary'
              variant='subtitle2'
            >
              priority
            </Typography>
            <div className='control-content'>
              <PriorityBadge priority={priorityTypes[0]} />
            </div>
          </div>
          <Typography variant="caption" color="text.secondary">Created - Jun 28, 2020, 7:30:00 PM</Typography>
          <Typography variant="caption" color="text.secondary">Created - Jun 28, 2020, 7:30:00 PM</Typography>
        </IssueControlsWrapper>
      </div>
    </Wrapper>
  );
};

const PriorityBadge: FC = ({ priorityId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
  const [selected, setSelected] = useState({});
  const [priorities, setPriorities] = useState(priorityTypes);
  const initPriorities = (priorityId) => {
    let priorityIdx = priorityTypes.findIndex((item) => item.id === priorityId);
    if (priorityIdx === -1) {
      priorityIdx = 0;
    }
    setSelected(priorityTypes[priorityIdx]);
    setPriorities(priorityTypes.filter((item, idx) => idx !== priorityIdx));
  };
  useEffect(() => {
    initPriorities(priorityId);
  }, [priorityId]);

  return (
    <div>
      <List disablePadding={true}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick} dense={true} selected={true}>
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
      <Wrapper
        id='priority-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
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

const AddNewItem = forwardRef(({ onClick }, ref) => (
  <Box
    onClick={onClick}
    ref={ref}
    sx={{
      color: 'primary.main',
      fontSize: '12px',
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      cursor: 'pointer',
      '& span': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      },
      '& .add-text': {
        ' &:hover': {
          textDecoration: 'underline',
        },
      },
    }}
  >
    <span style={{ fontSize: '20px', lineHeight: '20px', paddingRight: '4px' }}>+</span>
    <span className='add-text'> Add Assignee</span>
  </Box>
));
