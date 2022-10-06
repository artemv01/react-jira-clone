import { FC } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

interface Props {
  onDelete: () => void;
  onExpand: () => void;
  onClose?: () => void;
  singlePage?: boolean;
}
export const IssueModalControls: FC<Props> = ({ onDelete, onExpand, onClose, singlePage }) => {
  return (
    <Box
      sx={{
        '& .MuiButtonBase-root': {
          mr: 0.5,
        },
      }}
    >
      <IconButton  onClick={onDelete} aria-label='delete'>
        <DeleteOutlineIcon sx={{width: '22px', height: '22px'}}></DeleteOutlineIcon>
      </IconButton>
      {!singlePage && (
        <IconButton onClick={onExpand} aria-label='expand'>
          <OpenInNewIcon sx={{width: '22px', height: '22px'}}></OpenInNewIcon>
        </IconButton>
      )}
      {!singlePage && (
        <IconButton onClick={onClose} aria-label='close'>
          <CloseIcon sx={{width: '22px', height: '22px'}}></CloseIcon>
        </IconButton>
      )}
    </Box>
  );
};
