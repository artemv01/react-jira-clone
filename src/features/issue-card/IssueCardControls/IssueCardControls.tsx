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
  onSinglePage?: false;
}
export const IssueCardControls: FC<Props> = ({ onDelete, onExpand, onClose, onSinglePage }) => {
  return (
    <Box
      sx={{
        '& .MuiButtonBase-root': {
          mr: 0.5,
        },
      }}
    >
      <IconButton onClick={onDelete} aria-label='delete'>
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </IconButton>
      {!onSinglePage && (
        <IconButton onClick={onExpand} aria-label='expand'>
          <OpenInNewIcon></OpenInNewIcon>
        </IconButton>
      )}
      {!onSinglePage && (
        <IconButton onClick={onClose} aria-label='close'>
          <CloseIcon></CloseIcon>
        </IconButton>
      )}
    </Box>
  );
};
