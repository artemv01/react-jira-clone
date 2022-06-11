import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import IssueType from '../IssueType';
import Box from '@mui/material/Box';
const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  backgroundColor: theme.board.ticketBg,
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)} 64px ${theme.spacing(2.5)}`,
  width: '100%',
  maxWidth: '1040px',
  '& .editor-col': {
    flex: '1 1 auto',
    paddingLeft: '40px',
  },
  '& .issue-controls-col': {
    flex: '0 0 333px',
  },
  '& .issue-type-desc': {
    display: 'flex',
    cursor: 'pointer',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    width: 'fit-content',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    marginLeft: `-${theme.spacing(1)}`,
    borderRadius: '4px',
    '& .MuiTypography-root': {
      marginLeft: '8px',
    },
    '&:hover': {
      backgroundColor: theme.button.primary,
    },
  },
}));

const IssueControlsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'column nowrap',
  '& .issue-control': {
    marginBottom: theme.spacing(3),
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
      backgroundColor: theme.button.primary,
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      '&:hover': {
        backgroundColor: theme.button.dark,
      },
    },
  },
  '& .control-title': {},
}));

export const IssueCard: FC = () => {
  const theme = useTheme();

  return (
    <Wrapper>
      <div className='editor-col'>
        <div className='issue-type-desc'>
          <IssueType type={'bug'}></IssueType>
          <Typography fontSize={14} fontWeight='bold'>
            STR-123
          </Typography>
        </div>
        <Typography
          sx={{ mb: 2, '&:hover': { backgroundColor: theme.button.primary }, cursor: 'pointer' }}
          variant='h1'
        >
          How to build Jira clone? Follow these tutorials from its author.{' '}
        </Typography>
        <div className='issue-content'>
          <Typography variant='subtitle1' color='text.secondary'>
            Description
          </Typography>
          <Box sx={{ '&:hover': { backgroundColor: theme.button.primary }, cursor: 'pointer' }}>
            <div className='content'>
              After searching for an assignee on the list and clear the text, the option label was missing. It could be
              the bug on the ng-zorro select itself. If you have any idea, feel free to create a pull request.{' '}
            </div>
          </Box>
        </div>
      </div>
      <div className='issue-controls-col'>
        <IssueControlsWrapper>
          <div className='issue-control'>
            <Typography
              className='control-title'
              sx={{ textTransform: 'uppercase', mb: 0.5 }}
              fontWeight='bold'
              color='text.secondary'
              variant='subtitle2'
            >
              status
            </Typography>
            <div className='control-content'>
              <List disablePadding={true}>
                <ListItem disablePadding>
                  <ListItemButton dense={true} selected={true}>
                    <ListItemText
                      sx={{ mx: 1 }}
                      disableTypography
                      primary={
                        <Typography sx={{ textTransform: 'uppercase' }} component='span' fontSize={14}>
                          in progress
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </div>
          <div className='issue-control'>
            <Typography
              className='control-title'
              sx={{ textTransform: 'uppercase', mb: 0.5 }}
              fontWeight='bold'
              color='text.secondary'
              variant='subtitle2'
            >
              assignees
            </Typography>
            <div className='control-content'>
              <List>
                <ListItem disablePadding>
                  <ListItemButton dense={true} selected={true}>
                    <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                    <ListItemText
                      sx={{ mx: 1 }}
                      disableTypography
                      primary={<Typography fontSize={14}>JamesBond</Typography>}
                    />
                    <ListItemIcon>
                      <CloseIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton dense={true} selected={true}>
                    <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                    <ListItemText
                      sx={{ mx: 1 }}
                      disableTypography
                      primary={<Typography fontSize={14}>JamesBond</Typography>}
                    />
                    <ListItemIcon>
                      <CloseIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton dense={true} selected={true}>
                    <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                    <ListItemText
                      sx={{ mx: 1 }}
                      disableTypography
                      primary={<Typography fontSize={14}>JamesBond</Typography>}
                    />
                    <ListItemIcon>
                      <CloseIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </div>
        </IssueControlsWrapper>
      </div>
    </Wrapper>
  );
};
