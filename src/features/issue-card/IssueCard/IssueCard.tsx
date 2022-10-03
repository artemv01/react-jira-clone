import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';

import { priorityTypes } from '../../../shared/PriorityTypes';
import PriorityBadge from '../PriorityBadge';
import NoSsr from '../../../shared/NoSsr';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from '../../../shared/components/ReactQuill';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CommentInput from '../CommentInput';
import sanitizeHtml from 'sanitize-html';
import IssueCardControls from '../IssueCardControls';
import Backdrop from '@mui/material/Backdrop';
import DeleteIssueConfirm from '../DeleteIssueConfirm';
import AssigneeSelect from '../AssigneeSelect';
import { useRouter } from 'next/router';
import { editorFormats, editorModules } from '../../../shared/editorConfig';
import { IssueControlsWrapper, Props, Wrapper } from './IssueCard.styles';
import { ColumnType, Issue, IssueStatus } from '../../../shared/model/common';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  deleteIssue,
  moveIssue,
  selectIssueById,
  selectIssueByPublicId,
  selectIssues,
  updateIssue,
} from '../../../store/issuesSlice';
import React from 'react';
import SelectMenu from '../../../shared/components/SelectMenu';
import { users } from '../../../shared/stubs/users';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { issueTypes } from '../../../shared/IssueTypes';
import CommentCard from '../CommentCard';
import { getDateString } from '../../../shared/util/util';
import { sanitizeConfig } from './editorConfig';
interface Props {
  onClose?: () => void;
  singlePage?: boolean;
  publicId: string;
}
export const IssueCard: FC<Props> = ({ onClose, singlePage, publicId }) => {
  const issueData = useAppSelector(selectIssueByPublicId(publicId as string));
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  const { handleSubmit, control, reset, setValue, getValues, watch } = useForm<Issue & { text: string }>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      type: '',
      text: '',
      status: '',
      assignee: [],
      priority: '',
    },
  });

  useEffect(() => {
    if (issueData) {
      setValue('title', issueData.title);
      setValue('type', issueData.type);
      setValue('text', issueData.text);
      setValue('status', issueData.status);
      setValue('assignee', issueData.assignee);
      setValue('priority', issueData.priority);
      forceUpdate();
    }
  }, [issueData?.id]);

  const [watchType, watchAssignee, watchPriority, watchStatus] = watch(['type', 'assignee', 'priority', 'status']);
  useEffect(() => {
    onIssueStatusUpdate(watchStatus);
  }, [watchStatus]);
  useEffect(() => {
    onIssueUpdate({
      type: watchType,
      assignee: watchAssignee,
      priority: watchPriority,
    });
  }, [watchType, watchAssignee, watchPriority]);

  const theme = useTheme();
  const router = useRouter();

  const issuesStore = useAppSelector(selectIssues);

  const dispatch = useAppDispatch();

  const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);

  const [contentEditable, setContentEditable] = useState(false);
  const [titleEditable, setTitleEditable] = useState(false);

  const createMarkup = () => {
    const dirty = getValues('text');
    const clean = sanitizeHtml(dirty, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: { img: ['src'] },
      allowedSchemes: ['data', 'http', 'https'],
    });
    return { __html: clean };
  };

  const onIssueStatusUpdate = (value: string) => {
    if (issueData) {
      dispatch(
        moveIssue({
          sourceGroupId: issueData.status,
          destGroupId: value,
          issueId: issueData.id as string,
        })
      );
    }
  };

  const onIssueUpdate = (update: Partial<Record<keyof Issue, any>>) => {
    if (issueData) {
      dispatch(
        updateIssue({
          columnId: issueData.status,
          issue: { ...issueData, ...update },
          issueId: issueData.id as string,
        })
      );
    }
  };

  const onTextSubmit = () => {
    onIssueUpdate({ text: getValues('text') });
    setContentEditable(false);
  };
  const onTextCancel = () => {
    setValue('text', issueData.text);
    setContentEditable(false);
  };
  const onDeleteClick = () => {
    setDeleteModalOpened(true);
  };
  const onDeleteConfirm = () => {
    dispatch(deleteIssue({ issue: issueData }));
    setDeleteModalOpened(false);
    onClose && onClose();
  };
  const onDeleteCancel = () => {
    setDeleteModalOpened(false);
  };
  const onExpandClick = () => {
    router.push(`/project/issue/${publicId}`);
  };

  const ticketHeaderRef = useRef(null);
  const MemoizedEditor = React.memo(ReactQuill);

  useEffect(() => {
    function addTitleInputClick(event: Event): any {
      if (ticketHeaderRef.current && !(ticketHeaderRef.current as any).contains(event.target)) {
        setTitleEditable(false);
      } else if (ticketHeaderRef.current && (ticketHeaderRef.current as any).contains(event.target)) {
        setTitleEditable(true);
      }
    }
    document.addEventListener('click', addTitleInputClick, false);

    return function () {
      document.removeEventListener('click', addTitleInputClick, false);
    };
  }, [ticketHeaderRef, issueData]);

  // TODO (FEATURE): loading skeleton
  if (!issueData) {
    return <></>;
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
          <Box>
            <Controller
              render={({ field: { onChange, value } }) => (
                <SelectMenu
                  onChange={onChange}
                  id='select-type'
                  value={value}
                  uppercase={true}
                  options={issueTypes.map((item) => ({
                    value: item.id,
                    name: item.title,
                    img: item.img,
                  }))}
                />
              )}
              name={'type'}
              control={control}
            />
          </Box>
          <div ref={ticketHeaderRef}>
            {!titleEditable && (
              <Typography
                sx={{ mb: 2, mt: 1, '&:hover': { backgroundColor: theme.palette.button.primary }, cursor: 'pointer' }}
                variant='h1'
              >
                {getValues('title') || '\u00A0'}
              </Typography>
            )}
            {titleEditable && (
              <Controller
                render={({ field: { onChange, value } }) => (
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
                    value={value}
                    onChange={onChange}
                    onBlur={() => {
                      onIssueUpdate({ title: getValues('title') });
                    }}
                    variant='outlined'
                  />
                )}
                name={'title'}
                control={control}
              />
            )}
          </div>
          <div className='issue-content'>
            <Typography sx={{ mb: 1 }} variant='h4'>
              Description
            </Typography>
            {!contentEditable && (
              <Box
                onClick={() => setContentEditable(true)}
                sx={{
                  '&:hover': { backgroundColor: theme.palette.button.primary },
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                <div className='content' dangerouslySetInnerHTML={createMarkup()}></div>
              </Box>
            )}
            {contentEditable && (
              <Box>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <MemoizedEditor
                      theme={'snow'}
                      onChange={onChange}
                      value={value}
                      modules={editorModules}
                      formats={editorFormats}
                      placeholder='Issue text'
                    />
                  )}
                  name={'text'}
                  control={control}
                />
              </Box>
            )}
          </div>
          {contentEditable && (
            <div className='action-buttons'>
              <Button onClick={onTextSubmit} variant='contained'>
                Save
              </Button>
              <Button onClick={onTextCancel} variant='text'>
                Cancel
              </Button>
            </div>
          )}
          <Box className='comments' sx={{ mt: 3 }}>
            <Typography sx={{ mb: 2 }} variant='h4'>
              Comments
            </Typography>
            <Box sx={{ mb: 3 }}>
              <CommentInput issueId={issueData.id} user={users[0]}></CommentInput>
            </Box>
            {issueData?.comments?.map((comment, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <CommentCard comment={comment}></CommentCard>
              </Box>
            ))}
          </Box>
        </div>
        <div className='issue-controls-col'>
          <IssueControlsWrapper>
            <div className='issue-control'>
              <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
                status
              </Typography>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <SelectMenu
                    onChange={onChange}
                    id='select-status'
                    value={value}
                    uppercase={true}
                    options={issuesStore.map((item) => ({
                      value: item.id,
                      name: item.title,
                      bgColor: item.bgColor,
                      textColor: item.textColor,
                    }))}
                  />
                )}
                name={'status'}
                control={control}
              />
            </div>
            <div className='issue-control'>
              <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
                assignees
              </Typography>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <AssigneeSelect
                    options={users.map((item) => ({
                      name: item.name,
                      value: item.id,
                      img: item.avatarUrl,
                    }))}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name={'assignee'}
                control={control}
              />
            </div>
            <div className='issue-control'>
              <Typography sx={{ mb: 0.5 }} color='text.secondary' variant='label'>
                priority
              </Typography>
              <div className='control-content'>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <SelectMenu
                      onChange={onChange}
                      value={value}
                      id={'select-priority'}
                      options={priorityTypes.map((item) => ({
                        value: item.id,
                        name: item.title,
                        img: item.img,
                      }))}
                    />
                  )}
                  name={'priority'}
                  control={control}
                />
              </div>
            </div>
            <Typography variant='caption' color='text.secondary'>
              Created - {getDateString(new Date(issueData.createdAt))}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Updated - {getDateString(new Date(issueData.updatedAt))}
            </Typography>
          </IssueControlsWrapper>
        </div>
      </Wrapper>
    </NoSsr>
  );
};
