import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { FC, MouseEvent, useState } from 'react';

import { MainDrawer, SecondarySidebar, PrimarySidebar, Separator, ToggleSidebarIcon } from './Layout.styles';
import MainMenu from '../MainMenu';
import LogoIcon from '../../../shared/icons/LogoIcon';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { CreateIssue } from '../../create-issue/CreateIssue/CreateIssue';
import Backdrop from '@mui/material/Backdrop';
import SearchDrawer from '../../search-drawer/SearchDrawer';
import { theme } from '../../../shared/theme';
import { CreateIssueParams, addIssue } from '../../../store/issuesSlice';
import { useAppDispatch } from '../../../store/hooks';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
interface Props {
  children?: any;
}

export const Layout: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [showAddIssue, setShowAddIssue] = useState(false);

  const [searchDrawerOpened, setSearchDrawerOpened] = useState(false);
  const toggleSearchDrawer = (val: boolean) => {
    setSearchDrawerOpened(val);
  };

  const createIssueClose = () => {
    setShowAddIssue(false);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} open={showAddIssue}>
        <CreateIssue onClose={() => createIssueClose()}></CreateIssue>
      </Backdrop>
      <SearchDrawer isOpened={searchDrawerOpened} toggleCb={toggleSearchDrawer}></SearchDrawer>
      <Box sx={{ display: 'flex', alignContent: 'stretch', height: '100%' }}>
        <MainDrawer elevation={6} variant='permanent' open={open}>
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
              <IconButton
                onClick={() => toggleSearchDrawer(!searchDrawerOpened)}
                size='small'
                sx={{ color: theme.palette.primary.contrastText, mb: 1 }}
              >
                <SearchIcon></SearchIcon>
              </IconButton>
              <IconButton
                onClick={() => setShowAddIssue(true)}
                size='small'
                sx={{ color: theme.palette.primary.contrastText, mb: 1 }}
              >
                <AddIcon></AddIcon>
              </IconButton>
              <Box sx={{ flex: '1 1 auto' }}></Box>
              <Tooltip title='John Johnson' placement='right-start'>
                <Avatar alt='John Johnson' src='' sx={{ mb: 2, width: 28, height: 28 }} />
              </Tooltip>
              <IconButton
                size='small'
                sx={{ color: theme.palette.primary.contrastText, mb: 1 }}
                onClick={handlePopoverOpen}
              >
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
                <Box sx={{ p: 1 }}>This is a simplified Jira clone built with React and MUI</Box>
              </Popover>
            </SecondarySidebar>
            <PrimarySidebar>
              <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', mb: 3 }}>
                <Box sx={{ padding: '0 16px' }}>
                  <LogoIcon sx={{ fontSize: 32 }}></LogoIcon>
                </Box>
                <Box>
                  <Typography fontSize={15} sx={{ color: 'text.secondary' }}>
                    React Jira Clone
                  </Typography>
                  <Typography fontSize={13} sx={{ color: 'text.disabled' }}>
                    Software Project
                  </Typography>
                </Box>
              </Box>
              <MainMenu></MainMenu>
            </PrimarySidebar>
          </Box>
        </MainDrawer>
        <Separator>
          {open && (
            <ToggleSidebarIcon onClick={handleDrawerClose} size='small'>
              <ChevronLeftIcon fontWeight='bold' fontSize='inherit' />
            </ToggleSidebarIcon>
          )}
          {!open && (
            <ToggleSidebarIcon onClick={handleDrawerOpen} size='small'>
              <ChevronRightIcon fontWeight='bold' fontSize='inherit' />
            </ToggleSidebarIcon>
          )}
        </Separator>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
