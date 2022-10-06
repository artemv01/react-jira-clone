import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.board.issueBg,
  width: '100%',
  height: 'auto',
  padding: theme.spacing(1),
  minHeight: '80px',
  boxShadow: '#091e4240 0 1px 2px',
  fontSize: '15px',
  lineHeight: '20px',
  display: 'flex',
  flexFlow: 'column nowrap',
  '&:hover': {
    backgroundColor: theme.palette.button.dark,
  },
  '& > .text': {
    fontSize: '13px',
    lineHeight: '20px',
    marginBottom: theme.spacing(1.5),
  },
  '& > .controls ': {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  '.user-avatars': {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  '.user-avatar-item': {
    '&:first-of-type': {
      paddingLeft: '4px',
    },
    '& > .MuiAvatar-root': {
      marginLeft: '-4px',
      width: 24,
      height: 24,
      border: `1px solid ${theme.palette.board.issueBg}`,
    },
  },
  '.issue-id': {
    marginLeft: '12px',
    fontSize: '14px',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
  },
  '.filler': {
    flex: '1 1 auto',
  },
}));
