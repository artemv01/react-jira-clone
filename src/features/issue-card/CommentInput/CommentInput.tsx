import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { Issue, User } from '../../../shared/model/common';
import { users } from '../../../shared/stubs/users';
import { useAppDispatch } from '../../../store/hooks';
import { addComment } from '../../../store/issuesSlice';
interface Props {
  issueId: string;
  user: User;
}
export const CommentInput: FC<Props> = ({ issueId, user }) => {
  const dispatch = useAppDispatch();
  const commentValidate = object({
    text: string().required(),
  }).required();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<Issue & { text: string }>({
    mode: 'onChange',
    defaultValues: {
      text: '',
    },
    resolver: yupResolver(commentValidate),
  });

  const [showActions, setShowActions] = useState<boolean>(false);
  const onSubmit = () => {
    const text = getValues('text');
    const userId = users[0].id;
    dispatch(
      addComment({
        commentText: text,
        commentUserId: userId,
        issueId,
      })
    );
    reset();
    setShowActions(false);
  };
  const onCancel = () => {
    reset();

    setShowActions(false);
  };

  return (
    <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start' }}>
      <Box>
        <Avatar sx={{ width: '30px', height: '30px', flex: '0 0 30px' }} src={user.avatarUrl}></Avatar>
      </Box>
      <Box sx={{ flex: '1 1 auto', ml: 2 }}>
        <Typography sx={{ mb: 1 }} variant='body1'>
          {user.name}
        </Typography>
        <Controller
          render={({ field: { onChange, value } }) => (
            <TextField
              onClick={() => setShowActions(true)}
              multiline={true}
              fullWidth={true}
              value={value}
              onChange={onChange}
              placeholder={'Add a comment'}
              sx={{
                '& .MuiInputBase-root': {
                  p: '12px',
                },
                '& .MuiInputBase-input': {
                  fontSize: 14,
                },
              }}
              type='text'
              variant='outlined'
            />
          )}
          name={'text'}
          control={control}
        />

        {showActions && (
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              mt: 2,
              '& > .MuiButton-root': {
                mr: '8px',
              },
            }}
          >
            <Button onClick={onSubmit} variant='contained' disabled={!isValid}>
              Save
            </Button>
            <Button onClick={onCancel} variant='text'>
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
