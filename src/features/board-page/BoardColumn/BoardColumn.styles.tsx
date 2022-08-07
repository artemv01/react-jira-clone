import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(
  ({ theme }) =>
    ({
      backgroundColor: theme.palette.board.bg,
      height: '100%',
      display: 'flex',
      flexFlow: 'column',
      flexDirection: 'flex-start',
      alignItems: 'flex-start',
      justifyContent: 'center',
    } as any)
);

export const ItemsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'flex-start',
  flex: '1 1 auto',
  padding: `0 ${theme.spacing(1)}`,

  '& > *': {
    marginBottom: theme.spacing(1),
  },
}));
export const Header = styled('h1')(({ theme }) => ({
  fontSize: 13,
  margin: 0,
  color: theme.palette.text.secondary,
  padding: '12px 12px 16px 12px',
  textTransform: 'uppercase',
  fontWeight: 400,
}));
