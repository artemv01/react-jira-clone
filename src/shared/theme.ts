import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
    label2: true;
  }
}
declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: React.CSSProperties;
    label2: React.CSSProperties;
  }
  interface Palette {
    button: {
      primary: string;
      dark: string;
    };
    board: {
      bg: string;
      ticketBg: string;
    };
    silent: {
      silent1: string;
      silent2: string;
    };
    hoverMark: {
      primary: string;
    };
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
    silent: {
      silent1: string;
      silent2: string;
    };
    hoverMark: {
      primary: string;
    };
  }

  interface ThemeOptions {
    board?: {
      bg?: string;
      ticketBg?: string;
    };
    silent?: {
      silent1?: string;
      silent2?: string;
    };
    hoverMark?: {
      primary?: string;
    };
  }

  interface TypographyVariants {
    label: React.CSSProperties;
    label2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
    label2?: React.CSSProperties;
  }
}

export const theme = createTheme({
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
    label2: {
      fontSize: '12px',
    },
  },
  palette: {
    text: {
      primary: '#172B4D',
    },
    silent: {
      silent1: '#5E6C84',
      silent2: '#42526E',
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
    hoverMark: {
      primary: 'rgba(0,0,0,0.1)',
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
