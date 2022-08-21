import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { priorityTypes } from '../../../shared/PriorityTypes';
import IssueHeaderBadge from '../IssueHeaderBadge';
import AddNewAssignee from '../AddNewAssignee';
import PriorityBadge from '../PriorityBadge';
import NoSsr from '../../../shared/NoSsr';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from '../../../shared/components/ReactQuill';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CommentInput from '../CommentInput';
import Comment from '../Comment';

import IssueCardControls from '../IssueCardControls';
import Backdrop from '@mui/material/Backdrop';
import DeleteIssueConfirm from '../DeleteIssueConfirm';
import { useRouter } from 'next/router';
import { editorFormats, editorModules } from '../../../shared/editorConfig';
import { AssigneeMenu, IssueControlsWrapper, Props, Wrapper } from './IssueCard.styles';
import { Issue } from '../../../shared/model/common';
import { useAppSelector } from '../../../store/hooks';
import { selectIssues } from '../../../store/issuesSlice';
import React from 'react';

export const IssueCard: FC<Props> = ({ onClose, singlePage, id }) => {
  const theme = useTheme();
  const [assigneeBtn, setAssigneeBtn] = useState<null | HTMLElement>(null);
  const addAssigneeRef = useRef(null);
  const assigneeMenuOpen = Boolean(assigneeBtn);
  const router = useRouter();
  const [issueData, setIssueData] = useState<Issue>();
  const issuesStore = useAppSelector(selectIssues);

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
  const handleAddAssigneeClick = (event: React.MouseEvent<HTMLDivElement>): void => {
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
    router.push(`/project/issue/${id}`);
  };

  const ticketHeaderRef = useRef(null);
  const MemoizedEditor = React.memo(ReactQuill);

  useEffect(() => {
    function addTitleInputClick(event: Event): any {
      if (ticketHeaderRef.current && !(ticketHeaderRef.current as any).contains(event.target)) {
        setOpenEditors((editors) => ({ ...editors, header: false }));
      }
    }
    document.addEventListener('click', addTitleInputClick, true);

    return function () {
      document.removeEventListener('click', addTitleInputClick, true);
    };
  }, [ticketHeaderRef]);
  useEffect(() => {
    const mergedIssues = issuesStore.map((dataColumn) => dataColumn.items).flat();
    const issue = mergedIssues.find((issue) => issue.id === id);
    if (!issue) {
      // TODO (FEATURE): signal no issue exist and redirect to main screen
    }
    console.log(issue);
    setIssueData(issue);
  }, [id]);

  // TODO (FEATURE): loading skeleton
  if (!issueData) {
    return <></>
  }
  return (
    <NoSsr>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} open={isDeleteModalOpened}>
        <DeleteIssueConfirm onClose={onDeleteCancel} onConfirm={onDeleteConfirm}></DeleteIssueConfirm>
      </Backdrop>
      <Wrapper singlePage={singlePage}>
        <div className='issue-card-controls'>
          <IssueCardControls
            singlePage={singlePage}
            onDelete={onDeleteClick}
            onExpand={onExpandClick}
            onClose={onClose}
          ></IssueCardControls>
        </div>
        <div className='editor-col'>
          <IssueHeaderBadge issueId='STG-1234' issueTypeId={0}></IssueHeaderBadge>
          <div ref={ticketHeaderRef}>
            {!openEditors['header'] && (
              <Typography
                onClick={() => setOpenEditors({ ...openEditors, header: true })}
                sx={{ mb: 2, mt: 1, '&:hover': { backgroundColor: theme.palette.button.primary }, cursor: 'pointer' }}
                variant='h1'
              >
                {issueData.title}
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
                value={issueData.title}
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
                  {issueData.text}
                </div>
              </Box>
            )}
            {openEditors['content'] && (
              <Box>
                <MemoizedEditor
                  theme={'snow'}
                  onChange={handleTicketContentChange}
                  value={issueData.text}
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
                <PriorityBadge priorityId={priorityTypes[0].id} />
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
