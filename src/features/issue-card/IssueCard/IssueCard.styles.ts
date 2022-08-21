
import Menu from '@mui/material/Menu';
import { styled, useTheme } from '@mui/material/styles';
export interface Props {
    onClose?: () => void;
    singlePage?: boolean;
    id?: string;
    
  }
export const Wrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'singlePage',
  })<Props>(({ theme, singlePage }) => ({
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    backgroundColor: theme.palette.board.ticketBg,
    padding: !singlePage ? `${theme.spacing(2)} ${theme.spacing(2.5)} 64px ${theme.spacing(2.5)}` : 0,
    width: '100%',
    maxWidth: !singlePage ? '1040px' : '100%',
    '& .editor-col': {
      flex: '1 1 auto',
      marginRight: '40px',
    },
    '& .issue-controls-col': {
      flex: '0 0 333px',
      marginTop: '32px',
    },
    '& .issue-type-desc': {},
    '& .action-buttons': {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      marginTop: '16px',
      '& > .MuiButton-root': {
        marginRight: '8px',
      },
    },
    '& .issue-card-controls': {
      position: 'absolute',
      right: 0,
    },
  }));
  
  export const IssueControlsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    '& .issue-control': {
      marginBottom: theme.spacing(3),
      '& .MuiList-root': {
        paddingBottom: 0,
      },
      '& .MuiListItem-root': {
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        '& .MuiSvgIcon-root': {
          fontSize: '20px',
        },
      },
      '& .MuiListItemIcon-root': {
        width: '24px',
        minWidth: '24px',
      },
      '& .MuiListItemText-root': {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: '10px',
      },
      '& .MuiListItemText-root, & .MuiListItemButton-root ': {
        flex: '0 1 auto',
      },
      '& .MuiListItemButton-root': {
        backgroundColor: theme.palette.button.primary,
        padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
        '&:hover': {
          backgroundColor: theme.palette.button.dark,
        },
      },
    },
    '& .control-title': {},
  }));
  export const AssigneeMenu = styled(Menu)(({ theme }) => ({
    '& .MuiTypography-root': {
      fontSize: '14px',
      paddingLeft: theme.spacing(1),
    },
  }));