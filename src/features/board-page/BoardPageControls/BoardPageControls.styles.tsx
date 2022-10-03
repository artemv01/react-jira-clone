import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

export const BoardPageControlsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  '& .search-input': {
    width: '13rem',
  },
  '.user-avatars': {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginRight: '16px',
    marginLeft: '16px',
  },
  '.user-avatar-item': {
    '&:first-of-type': {
      paddingLeft: '6px',
    },
    '& > .MuiAvatar-root': {
      cursor: 'pointer',
      marginLeft: '-6px',
      width: 36,
      height: 36,
      border: `1px solid ${theme.palette.board.issueBg}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    },
  },
  '& .MuiList-root': {
    display: 'flex',
    flexFlow: 'row nowrap',
    paddingLeft: '12px',
    paddingRight: '12px',
    '& .MuiListItemButton-root': {
      paddingTop: '4px',
      paddingBottom: '4px',
    },
    '& .MuiTypography-root': {
      whiteSpace: 'nowrap',
      wordBreak: 'break-word',
      fontSize: '14px',
    },
    '& .separator': {
      height: '2rem',
      width: '1px',
      backgroundColor: theme.palette.text.disabled,
      boxSizing: 'content-box',
      marginRight: '12px',
      marginLeft: '12px',
    },
  },
}));
export const SearchInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    paddingLeft: '8px',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    fontSize: 16,
    padding: '4px 8px 4px 0px',
  },
  '& MuiInputAdornment-root': {
    marginRight: 0,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
}));
