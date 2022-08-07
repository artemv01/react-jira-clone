import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

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
