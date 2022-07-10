import { styled, useTheme, Theme, CSSObject, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

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

import { FC, MouseEvent, useState } from 'react';

import {
  MainDrawer,
  SecondarySidebar,
  PrimarySidebar,
  Separator,
  ToggleSidebarIcon,
  SearchDrawer,
} from './Layout.styles';
import MainMenu from '../MainMenu';
import LogoIcon from '../../icons/LogoIcon';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: React.CSSProperties;
  }
  interface PaletteOptions {
    button: {
      primary: string;
      dark: string;
    };
    board: {
      bg: string;
      ticketBg: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    shadow: string;
    board?: {
      bg?: string;
      ticketBg?: string;
    };
  }
}

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '24px',
    },
    h4: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    label: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: '14px',
    },
  },
  palette: {
    text: {
      primary: '#172B4D',
    },
    primary: {
      main: '#0747A6',
      light: '#4C9AFF',
      contrastText: '#fff',
    },
    button: {
      primary: 'rgba(0,0,0,0.1)',
      dark: 'rgba(0,0,0,0.2)',
    },
    board: {
      bg: '#F4F5F7',
      ticketBg: '#fff',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: ({ theme }) => ({
            textTransform: 'none',
            border: `none`,
            borderRadius: '0',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          }),
        },
        {
          props: { variant: 'text' },
          style: ({ theme }) => ({
            textTransform: 'none',
            border: `none`,
            borderRadius: '0',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: theme.palette.button.dark,
              boxShadow: 'none',
            },
          }),
        },
      ],
    },
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface Props {
  children: any;
}
export const Layout: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);

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
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setSearchDrawerOpened(open);
  };

  return (
    <ThemeProvider theme={theme}>
      {/*   <SearchDrawer sx={{}} elevation={6} variant="permanent" open={searchDrawerOpened} onClose={toggleSearchDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleSearchDrawer(false)}
          onKeyDown={toggleSearchDrawer(false)}
          sx={{width: 500, height: '100%', background: 'black'}}
        >
          drawer it is
        </Box>
      </SearchDrawer> */}
      <Box sx={{ display: 'flex', alignContent: 'stretch', height: '100%' }}>
        <CssBaseline />

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
                onClick={toggleSearchDrawer(true)}
                size='small'
                sx={{ color: theme.palette.primary.contrastText, mb: 1 }}
              >
                <SearchIcon></SearchIcon>
              </IconButton>
              <IconButton size='small' sx={{ color: theme.palette.primary.contrastText, mb: 1 }}>
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
