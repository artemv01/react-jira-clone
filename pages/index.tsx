import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {styled, useTheme, Theme, CSSObject, createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {MouseEvent, useState} from 'react';
import {Avatar, Paper, Popover, Tooltip} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoIcon from '../src/components/Logo';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
const drawerWidth = 304;

const theme = createTheme({
  palette: {
    primary: {
      main: '#0747A6',
      light: '#4C9AFF',
      contrastText: '#fff',
    },
  },
});
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 84,
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const MainDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
const SearchDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '.MuiPaper-root': {zIndex: 99999},
}));
const SecondarySidebar = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'column',
  width: '64px',
  flex: '0 0 64px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: `${theme.spacing(3)} 0`,
}));
const PrimarySidebar = styled(Box)(({theme}) => ({
  backgroundColor: '#F4F5F7',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: 240,
  padding: theme.spacing(3, 2),
}));
const ToggleSidebarIcon = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  zIndex: '10000',
  top: 40,
  left: '-15px',
  background: '#fff',
  border: '1px solid rgba(0, 0, 0, 0.12)',

  '&:hover': {
    background: theme.palette.primary.light,
    color: '#fff',
    border: `1px solid ${theme.palette.primary.light}`,
  },
}));
const Separator = styled(Box)(({theme}) => ({
  width: 25,
  height: '100%',
  position: 'relative',
  zIndex: 10000,
  boxShadow: '-6px 0px 5px -2px rgb(0 0 0 / 6%)',
  borderLeft: '2px solid transparent',
  transition: theme.transitions.create(['all'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '&:hover': {
    borderColor: theme.palette.primary.light,
  },
}));
function Home() {
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const openPopover = Boolean(anchorEl);
  const popoverId = open ? 'info-popover' : undefined;
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [searchDrawerOpened, setSearchDrawerOpened] = useState(false);
  const toggleSearchDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setSearchDrawerOpened(open);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <SearchDrawer sx={{}} elevation={6} variant="permanent" open={searchDrawerOpened} onClose={toggleSearchDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleSearchDrawer(false)}
          onKeyDown={toggleSearchDrawer(false)}
          sx={{width: 500, height: '100%', background: 'black'}}
        >
          drawer it is
        </Box>
      </SearchDrawer> */}
      <Box sx={{display: 'flex', alignContent: 'stretch', height: '100%'}}>
        <CssBaseline />

        <MainDrawer elevation={6} variant="permanent" open={open}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-stretch',
              position: 'relative',
              height: '100%',
              width: '100%',
            }}
          >
            <SecondarySidebar>
              <IconButton onClick={toggleSearchDrawer(true)} size="small" sx={{color: theme.palette.primary.contrastText, mb: 1}}>
                <SearchIcon></SearchIcon>
              </IconButton>
              <IconButton size="small" sx={{color: theme.palette.primary.contrastText, mb: 1}}>
                <AddIcon></AddIcon>
              </IconButton>
              <Box sx={{flex: '1 1 auto'}}></Box>
              <Tooltip title="John Johnson" placement="right-start">
                <Avatar alt="John Johnson" src="" sx={{mb: 2, width: 28, height: 28}} />
              </Tooltip>
              <IconButton size="small" sx={{color: theme.palette.primary.contrastText, mb: 1}} onClick={handlePopoverOpen}>
                <HelpIcon></HelpIcon>
              </IconButton>
              <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
              >
                <Box sx={{p: 1}}>This is a simplified Jira clone built with React and MUI</Box>
              </Popover>
            </SecondarySidebar>
            <PrimarySidebar>
              <Box sx={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', mb: 3}}>
                <Box sx={{padding: '0 16px'}}>
                  <LogoIcon sx={{fontSize: 32}}></LogoIcon>
                </Box>
                <Box>
                  <Typography fontSize={15} sx={{color: 'text.secondary'}}>
                    React Jira Clone
                  </Typography>
                  <Typography fontSize={13} sx={{color: 'text.disabled'}}>
                    Software Project
                  </Typography>
                </Box>
              </Box>
              <List sx={{width: '100%'}}>
                <ListItem disablePadding>
                  <ListItemButton sx={{py: 1}} component="a" href="/kanban">
                    <ListItemIcon
                      sx={{
                        width: '24px',
                        minWidth: '24px',
                        marginRight: '16px',
                      }}
                    >
                      <ViewKanbanIcon sx={{color: 'text.primary'}} />
                    </ListItemIcon>
                    <ListItemText disableTypography primary={<Typography fontSize={15}>Kanban Board</Typography>} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        width: '24px',
                        minWidth: '24px',
                        marginRight: '16px',
                      }}
                    >
                      <SettingsIcon sx={{color: 'text.primary'}} />
                    </ListItemIcon>
                    <ListItemText disableTypography primary={<Typography fontSize={15}>Project Settings</Typography>} />
                  </ListItemButton>
                </ListItem>
              </List>
            </PrimarySidebar>
          </Box>
        </MainDrawer>
        <Separator>
          {open && (
            <ToggleSidebarIcon onClick={handleDrawerClose} size="small">
              <ChevronLeftIcon fontWeight="bold" fontSize="inherit" />
            </ToggleSidebarIcon>
          )}
          {!open && (
            <ToggleSidebarIcon onClick={handleDrawerOpen} size="small">
              <ChevronRightIcon fontWeight="bold" fontSize="inherit" />
            </ToggleSidebarIcon>
          )}
        </Separator>
        <Box component="main" sx={{flexGrow: 1, p: 3}}></Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
