import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import IssueType from '../IssueType';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SvgIcon from '@mui/material/SvgIcon';

import { priorityTypes } from '../../../shared/PriorityTypes';
import { issueTypes } from '../../../shared/IssueTypes';
import IssueHeaderBadge from '../IssueHeaderBadge';
import AddNewAssignee from '../AddNewAssignee';
import PriorityBadge from '../PriorityBadge';
import NoSsr from '../../../shared/NoSsr';
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from '../../../shared/components/ReactQuill';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CommentInput from '../CommentInput';
import Comment from '../Comment';

import IssueCardControls from '../IssueCardControls';
import Backdrop from '@mui/material/Backdrop';
import DeleteIssueConfirm from '../DeleteIssueConfirm';
import {useRouter} from 'next/router';
import {editorFormats, editorModules} from '../../../shared/editorConfig';

const Wrapper = styled('div')<Props>(({ theme, onSinglePage }) => ({
  position: 'relative',
  display: 'flex',
  flexFlow: 'row nowrap',
  backgroundColor: theme.palette.board.ticketBg,
  padding: !onSinglePage ? `${theme.spacing(2)} ${theme.spacing(2.5)} 64px ${theme.spacing(2.5)}` : 0,
  width: '100%',
  maxWidth: !onSinglePage ? '1040px' : '100%',
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

const IssueControlsWrapper = styled('div')(({ theme }) => ({
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
const AssigneeMenu = styled(Menu)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '14px',
    paddingLeft: theme.spacing(1),
  },
}));

interface Props {
  onClose?: () => {};
  onSinglePage?: boolean;
}

export const IssueCard: FC<Props> = ({ onClose, onSinglePage, issueId }) => {
  const theme = useTheme();
  const [assigneeBtn, setAssigneeBtn] = useState<null | HTMLElement>(null);
  const addAssigneeRef = useRef(null);
  const assigneeMenuOpen = Boolean(assigneeBtn);
  const router = useRouter()

  const [ticketContent, setTicketContent] = useState<string>(`
  After searching for an assignee on the list and clear the text, the option label was missing. It could
  be the bug on the ng-zorro select itself. If you have any idea, feel free to create a pull request.
 `);
  const [ticketHeader, setTicketHeader] = useState<string>(
    'How to build Jira clone? Follow these tutorials from its author'
  );
  const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);
  const [openEditors, setOpenEditors] = useState<Record<string, any>>({
    content: false,
    header: false,
  });

  const toggleOpenEditor = (editor: string) => {
    setOpenEditors((state) => ({ ...state, content: !state[editor] }));
  };
  const handleAddAssigneeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAssigneeBtn(event.currentTarget);
  };
  const handleAssigneeMenuClose = () => {
    setAssigneeBtn(null);
  };
  const handleTicketContentChange = (content: string) => {
    setTicketContent(content);
  };
  const onSubmit = () => {
    setOpenEditors((editors) => ({ ...editors, content: false }));
  };
  const onCancel = () => {
    setOpenEditors((editors) => ({ ...editors, content: false }));
  };

  const onDeleteClick = () => {
    setDeleteModalOpened(true);
  };
  const onDeleteConfirm = () => {
    setDeleteModalOpened(false);
  };
  const onDeleteCancel = () => {
    setDeleteModalOpened(false);
  };
  const onExpandClick = () => {
     router.push(`/project/issue/${issueId}`)
  }

  const ticketHeaderRef = useRef(null);
  useEffect(() => {
    function addTitleInputClick(event) {
      if (ticketHeaderRef.current && !ticketHeaderRef.current.contains(event.target)) {
        setOpenEditors((editors) => ({ ...editors, header: false }));
      }
    }
    document.addEventListener('click', addTitleInputClick, true);

    return function () {
      document.removeEventListener('click', addTitleInputClick, true);
    };
  }, [ticketHeaderRef]);


  return (
    <NoSsr>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} open={isDeleteModalOpened}>
        <DeleteIssueConfirm onClose={onDeleteCancel} onConfirm={onDeleteConfirm}></DeleteIssueConfirm>
      </Backdrop>
      <Wrapper onSinglePage={onSinglePage}>
        <div className='issue-card-controls'>
          <IssueCardControls onSinglePage={onSinglePage} onDelete={onDeleteClick} onExpand={onExpandClick} onClose={onClose}></IssueCardControls>
        </div>
        <div className='editor-col'>
          <IssueHeaderBadge issueId='STG-1234' issueTypeId='bug'></IssueHeaderBadge>
          <div ref={ticketHeaderRef}>
            {!openEditors['header'] && (
              <Typography
                onClick={() => setOpenEditors({ ...openEditors, header: true })}
                sx={{ mb: 2, mt: 1, '&:hover': { backgroundColor: theme.palette.button.primary }, cursor: 'pointer' }}
                variant='h1'
              >
                {ticketHeader}
              </Typography>
            )}
            {openEditors['header'] && (
              <TextField
                multiline={true}
                fullWidth={true}
                sx={{
                  mb: 2,
                  mt: 1,
                  '& .MuiInputBase-input': {
                    fontSize: 24,
                  },
                }}
                type='text'
                value={ticketHeader}
                onChange={($event) => setTicketHeader($event.target.value)}
                variant='outlined'
              />
            )}
          </div>
          <div className='issue-content'>
            <Typography sx={{ mb: 1 }} variant='h4'>
              Description
            </Typography>
            {!openEditors['content'] && (
              <Box
                onClick={() => toggleOpenEditor('content')}
                sx={{ '&:hover': { backgroundColor: theme.palette.button.primary }, cursor: 'pointer' }}
              >
                <div className='content'>
                  After searching for an assignee on the list and clear the text, the option label was missing. It could
                  be the bug on the ng-zorro select itself. If you have any idea, feel free to create a pull request.{' '}
                </div>
              </Box>
            )}
            {openEditors['content'] && (
              <Box>
                <ReactQuill
                  theme={'snow'}
                  onChange={handleTicketContentChange}
                  value={ticketContent}
                  modules={editorModules}
                  formats={editorFormats}
                  placeholder='Issue text'
                />
              </Box>
            )}
          </div>
          {openEditors['content'] && (
            <div className='action-buttons'>
              <Button onClick={onSubmit} variant='contained'>
                Save
              </Button>
              <Button onClick={onCancel} variant='text'>
                Cancel
              </Button>
            </div>
          )}
          <Box className='comments' sx={{ mt: 3 }}>
            <Typography sx={{ mb: 2 }} variant='h4'>
              Comments
            </Typography>
            <Box sx={{ mb: 3 }}>
              <CommentInput></CommentInput>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Comment></Comment>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Comment></Comment>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Comment></Comment>
            </Box>
          </Box>
        </div>
        <div className='issue-controls-col'>
          <IssueControlsWrapper>
            <div className='issue-control'>
              <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
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
              <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
                assignees
              </Typography>
              <div className='control-content'>
                <List disablePadding={true}>
                  <ListItem disablePadding={true}>
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
                <AddNewAssignee ref={addAssigneeRef} onClick={handleAddAssigneeClick} />
                <AssigneeMenu
                  id='assignee-menu'
                  anchorEl={assigneeBtn}
                  open={assigneeMenuOpen}
                  onClose={handleAssigneeMenuClose}
                >
                  <MenuList disablePadding={true}>
                    <MenuItem>
                      <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                      <ListItemText>John Johnson</ListItemText>
                    </MenuItem>
                  </MenuList>
                  <MenuList disablePadding>
                    <MenuItem>
                      <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                      <ListItemText>John Johnson</ListItemText>
                    </MenuItem>
                  </MenuList>
                  <MenuList disablePadding>
                    <MenuItem>
                      <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
                      <ListItemText>John Johnson</ListItemText>
                    </MenuItem>
                  </MenuList>
                </AssigneeMenu>
              </div>
            </div>
            <div className='issue-control'>
              <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
                priority
              </Typography>
              <div className='control-content'>
                <PriorityBadge priority={priorityTypes[0]} />
              </div>
            </div>
            <Typography variant='caption' color='text.secondary'>
              Created - Jun 28, 2020, 7:30:00 PM
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Created - Jun 28, 2020, 7:30:00 PM
            </Typography>
          </IssueControlsWrapper>
        </div>
      </Wrapper>
    </NoSsr>
  );
};
