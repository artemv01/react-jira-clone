import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { styled, useTheme, Theme, CSSObject, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
import { MouseEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoIcon from '../src/components/Logo';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import MainMenu from '../src/components/layout/MainMenu';
const openedMixin =
  (width: number) =>
  (theme: Theme): CSSObject => ({
    width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

const closedMixin =
  (width: number) =>
  (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width,
  });

export const MainDrawer = styled(MuiDrawer)(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(304)(theme),
    '& .MuiDrawer-paper': openedMixin(304)(theme),
  }),
  ...(!open && {
    ...closedMixin(84)(theme),
    '& .MuiDrawer-paper': closedMixin(84)(theme),
  }),
}));

export const SecondarySidebar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'column',
  width: '64px',
  flex: '0 0 64px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: `${theme.spacing(3)} 0`,
}));
export const PrimarySidebar = styled(Box)(({ theme }) => ({
  backgroundColor: '#F4F5F7',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: 240,
  padding: theme.spacing(3, 2),
}));
export const ToggleSidebarIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndex.drawer + 1,
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
export const Separator = styled(Box)(({ theme }) => ({
  width: 25,
  height: '100%',
  position: 'relative',
  zIndex: theme.zIndex.drawer + 1,
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
