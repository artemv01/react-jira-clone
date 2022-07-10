import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';

export const CommentInput: FC = () => {
  const [showActions, setShowActions] = useState<boolean>(false);
  const onSubmit = () => {
    setShowActions(false);
  };
  const onCancel = () => {
    setShowActions(false);
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start' }}>
        <Box>
          <Avatar sx={{ width: '30px', height: '30px', flex: '0 0 30px' }} src={'/images/avatar1.jpg'}></Avatar>
        </Box>
        <Box sx={{ flex: '1 1 auto', ml: 2 }}>
          <Typography sx={{ mb: 1 }} variant='body1'>
            James Bond
          </Typography>
          <TextField
            onClick={() => setShowActions(true)}
            multiline={true}
            fullWidth={true}
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
              <Button onClick={onSubmit} variant='contained'>
                Save
              </Button>
              <Button onClick={onCancel} variant='text'>
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
