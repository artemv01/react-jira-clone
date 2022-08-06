import OutlinedInput from '@mui/material/OutlinedInput';
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme, Theme, CSSObject, createTheme, ThemeProvider } from '@mui/material/styles';

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

export const SearchInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    padding: '0px 8px 8px 0px',
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    fontSize: 20,
    color: `${theme.palette.text.silent}`,
    padding: '4px 8px 4px 0px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: `0`,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
  },
  '& MuiInputAdornment-root': {
    marginRight: 0,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '24px',
  },
}));
export const DrawerWrapper = styled(MuiDrawer)(({ theme, open }) => ({
  width: 500,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: theme.zIndex.drawer + 2,
  ...(open && {
    ...openedMixin(500)(theme),
    '& .MuiDrawer-paper': openedMixin(500)(theme),
  }),
  ...(!open && {
    ...closedMixin(0)(theme),
    '& .MuiDrawer-paper': closedMixin(0)(theme),
  }),
}));
