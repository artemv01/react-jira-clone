import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { FC, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SelectType from '../SelectType';
import SelectPriority from '../SelectPriority';
import SelectUser from '../SelectUser';
import Label from '../../../shared/components/Label';
import { editorFormats, editorModules } from '../../../shared/editorConfig';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from '../../../shared/components/ReactQuill';
import TextField from '../../../shared/components/TextField';
import { users } from '../../../shared/stubs/users';
import { priorityTypes } from '../../../shared/PriorityTypes';
import { issueTypes } from '../../../shared/IssueTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { AddIssueParams, addIssue } from '../../../store/issuesSlice';
import { nanoid } from '@reduxjs/toolkit';
import { Issue } from '../../../shared/model/common';
import { incrementLastUsedId, selectSettings } from '../../../store/settingsSlice';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, array } from 'yup';
import { ErrorMessage } from '../../../shared/components/ErrorMessage/ErrorMessage';
import { BACKLOG_COLUMN_ID } from '../../../shared/model/const';
interface Props {
  onClose: () => void;
}
interface CreateIssue {
  type: string;
  priority: string;
  assignee: string[];
  reporter: string;
  title: string;
  text: string;
}

export const CreateIssue: FC<Props> = ({ onClose }) => {
  const createIssueValidate = object({
    type: string().required(),
    priority: string().required(),
    assignee: array(),
    reporter: string().required(),
    title: string().required(),
    text: string(),
  }).required();
  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      type: issueTypes[0].id,
      priority: priorityTypes[0].id,
      assignee: [],
      reporter: users[0].id,
      title: '',
      text: '',
    },
    resolver: yupResolver(createIssueValidate),
  });
  const { errors, isSubmitSuccessful } = useFormState({
    control,
  });
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);
  const projectSettings = useAppSelector(selectSettings);

  const dispatch = useAppDispatch();

  const MemoizedEditor = React.memo(ReactQuill);

  function submit(formData: any) {
    const createIssueData = {
      ...formData,
      id: nanoid(),
      publicId: `${projectSettings.issueIdPrefix}-${projectSettings.lastUsedIssueId + 1}`,
    };
    const payload: AddIssueParams = {
      issue: createIssueData as Issue,
      columnId: BACKLOG_COLUMN_ID,
    };
    dispatch(addIssue(payload));
    dispatch(incrementLastUsedId());
    onClose();
  }
  return (
    <Box
      sx={{
        p: 3,
        width: '700px',
        background: (theme) => theme.palette.board.ticketBg,
      }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h1'>Create issue</Typography>
          <IconButton onClick={() => onClose()} aria-label='close'>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
        <Box>
          <Box sx={{ mb: 1 }}>
            <Label text='Issue type'>
              <Controller
                render={({ field: { onChange, value } }) => <SelectType onChange={onChange} value={value} />}
                name={'type'}
                control={control}
              />
            </Label>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Label text='Issue priority'>
              <Controller
                render={({ field: { onChange, value } }) => <SelectPriority onChange={onChange} value={value} />}
                name={'priority'}
                control={control}
              />
            </Label>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Label text='Description'>
              <Box
                sx={{
                  '& .ql-container': {
                    height: '170px',
                  },
                }}
              >
                <Controller
                  render={({ field: { onChange, value, onBlur } }) => (
                    <MemoizedEditor
                      theme={'snow'}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      modules={editorModules}
                      formats={editorFormats}
                    />
                  )}
                  name={'text'}
                  control={control}
                />
              </Box>
            </Label>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Label text='Reporter'>
              <Controller
                render={({ field: { onChange, value } }) => <SelectUser onChange={onChange} value={value} />}
                name={'reporter'}
                control={control}
              />
            </Label>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Label text='Short summary'>
              <Controller
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextField onBlur={onBlur} value={value} onChange={onChange}></TextField>
                )}
                name={'title'}
                control={control}
              />
            </Label>
            {errors.title && <ErrorMessage message={'Summary is required'} />}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Label text='Assignees'>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <SelectUser
                    setValue={(newVal) => setValue('assignee', newVal)}
                    value={value}
                    multiple={true}
                    onChange={onChange}
                  />
                )}
                name={'assignee'}
                control={control}
              />
            </Label>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: '16px',
              '& > .MuiButton-root': {
                marginRight: '8px',
              },
            }}
          >
            <Button variant='contained' type='submit'>
              Create Issue
            </Button>
            <Button variant='text' onClick={() => onClose()}>
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
