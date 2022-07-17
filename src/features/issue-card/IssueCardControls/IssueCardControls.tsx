import { FC } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

interface Props {
  onDelete: () => void;
  onExpand: () => void;
  onClose: () => void;
}
export const IssueCardControls: FC<Props> = (props) => {
  return (
    <Box
      sx={{
        '& .MuiButtonBase-root': {
          mr: 0.5,
        },
      }}
    >
      <IconButton onClick={props.onDelete} aria-label='delete'>
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </IconButton>
      <IconButton onClick={props.onExpand} aria-label='expand'>
        <OpenInNewIcon></OpenInNewIcon>
      </IconButton>
      <IconButton onClick={props.onClose} aria-label='close'>
        <CloseIcon></CloseIcon>
      </IconButton>
    </Box>
  );
};
