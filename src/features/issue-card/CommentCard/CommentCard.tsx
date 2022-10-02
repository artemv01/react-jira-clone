import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { Comment, User } from '../../../shared/model/common';
import { users } from '../../../shared/stubs/users';
import {getDateString} from '../../../shared/util/util';
interface Props {
  comment: Comment;
}
export const CommentCard: FC<Props> = ({ comment }) => {

  return (
    <>
      <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start' }}>
        <Box>
          <Avatar sx={{ width: '30px', height: '30px', flex: '0 0 30px' }} src={comment.user.avatarUrl}></Avatar>
        </Box>
        <Box sx={{ flex: '1 1 auto', ml: 2 }}>
          <Box sx={{ display: 'flex', mb: 0.5, alignItems: 'center' }}>
            <Typography variant='body1'>{comment.user.name}</Typography>
            <Typography sx={{ ml: 2 }} variant='caption'>
              {getDateString(new Date(comment.createdAt))}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14 }} variant='body1'>
              {comment.text}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
