import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}
export const DeleteIssueConfirm: FC<Props> = (props) => {
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.board.bg, p: 4}}>
      <Box sx={{mb: 2}}>
        <Typography variant='h1'>Are you sure you want to delete this issue?</Typography>
      </Box>
      <Box sx={{mb: 2}}>
        <Typography variant='body1'>This action cannot be undone.</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          '& > .MuiButton-root': {
            mr: '8px',
          },
        }}
      >
        <Button onClick={props.onConfirm} variant='contained'>
          Delete
        </Button>
        <Button onClick={props.onClose} variant='text'>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
