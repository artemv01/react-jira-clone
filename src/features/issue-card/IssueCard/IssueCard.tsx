import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

import { priorityTypes } from '../../../shared/PriorityTypes';
import IssueHeaderBadge from '../IssueHeaderBadge';
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
import AssigneeSelect from '../AssigneeSelect';
import { useRouter } from 'next/router';
import { editorFormats, editorModules } from '../../../shared/editorConfig';
import { IssueControlsWrapper, Props, Wrapper } from './IssueCard.styles';
import { ColumnType, Issue, IssueStatus } from '../../../shared/model/common';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { moveIssue, selectIssueById, selectIssues, updateIssue } from '../../../store/issuesSlice';
import React from 'react';
import SelectMenu from '../../../shared/components/SelectMenu';
import { issueStatuses } from '../../../shared/IssueStatuses';
import { users } from '../../../shared/stubs/users';
import { Controller, useForm, useFormState } from 'react-hook-form';

export const IssueCard: FC<Props> = ({ onClose, singlePage, id }) => {
  const issueData = useAppSelector(selectIssueById(id));
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  //   const createIssueValidate = object({
  //     type: string().required(),
  //     priority: string().required(),
  //     assignee: array(),
  //     reporter: string().required(),
  //     title: string().required(),
  //     text: string(),
  //   }).required();
  const { handleSubmit, control, reset, setValue, getValues } = useForm({
    mode: 'onBlur',

    defaultValues: {
      title: '',
      textBuffer: '',
      status: '',
      assignee: [],
      priority: '',
    },
    // resolver: yupResolver(createIssueValidate),
  });
  const { errors, dirtyFields, isValid, isSubmitSuccessful } = useFormState({
    control,
  });
  const submit = (formData: Record<string, any>) => {
    const { textBuffer, ...payload } = formData;
    if (payload.status !== issueData.status) {
      onIssueStatusUpdate(payload.status);
    } else {
      onIssueUpdate(payload);
    }
  };

  useEffect(() => {
    if (issueData) {
      setValue('title', issueData.title);
      setValue('textBuffer', issueData.text);
      setValue('status', issueData.status);
      setValue('assignee', issueData.assignee);
      setValue('priority', issueData.priority);
      forceUpdate();
    }
  }, [!!issueData]);

  const theme = useTheme();
  const router = useRouter();

  const issuesStore = useAppSelector(selectIssues);

  const dispatch = useAppDispatch();

  const onIssueStatusUpdate = (value: ColumnType) => {
    dispatch(
      moveIssue({
        sourceGroupId: issueData.status,
        destGroupId: value,
        issueId: issueData.id,
      })
    );
  };

  const onIssueUpdate = (update: Partial<Record<keyof Issue, any>>) => {
    dispatch(
      updateIssue({
        columnId: issueData.status,
        issue: { ...issueData, ...update },
        issueId: issueData.id,
      })
    );
  };

  const [isDeleteModalOpened, setDeleteModalOpened] = useState(false);

  const [contentEditable, setContentEditable] = useState(false);
  const [titleEditable, setTitleEditable] = useState(false);

  const onSubmit = () => {
    onIssueUpdate({ text: getValues('textBuffer') });
    setContentEditable(false);
  };
  const onCancel = () => {
    setValue('textBuffer', issueData.text);
    setContentEditable(false);
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

  /* useEffect(() => {
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
  }, [ticketHeaderRef, issueData]); */

  // TODO (FEATURE): loading skeleton
  if (!issueData) {
    return <></>;
  }
  return (
    <NoSsr>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} open={isDeleteModalOpened}>
        <DeleteIssueConfirm onClose={onDeleteCancel} onConfirm={onDeleteConfirm}></DeleteIssueConfirm>
      </Backdrop>
      <form onSubmit={handleSubmit(submit)} onBlur={handleSubmit(submit)}>
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
            {/* <IssueHeaderBadge issueId={issueData.publicId} issueTypeId={0}></IssueHeaderBadge> */}
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
                  sx={{ '&:hover': { backgroundColor: theme.palette.button.primary }, cursor: 'pointer' }}
                >
                  <div className='content'>{getValues('textBuffer')}</div>
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
                    name={'textBuffer'}
                    control={control}
                  />
                </Box>
              )}
            </div>
            {contentEditable && (
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
                <SelectMenu
                  uppercase={true}
                  options={issuesStore.map((item) => ({
                    value: item.id,
                    name: item.title,
                    bgColor: item.bgColor,
                    textColor: item.textColor,
                  }))}
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
                Created - Jun 28, 2020, 7:30:00 PM
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Created - Jun 28, 2020, 7:30:00 PM
              </Typography>
            </IssueControlsWrapper>
          </div>
        </Wrapper>
      </form>
    </NoSsr>
  );
};
