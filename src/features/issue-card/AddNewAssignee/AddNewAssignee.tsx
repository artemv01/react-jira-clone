import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  ref?: React.RefObject<HTMLInputElement>;
}

export const AddNewAssignee = forwardRef<HTMLDivElement, Props>(({ onClick }, ref) => (
  <Box
    onClick={onClick}
    ref={ref}
    sx={{
      color: 'primary.main',
      fontSize: '12px',
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      cursor: 'pointer',
      '& span': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      },
      '& .add-text': {
        ' &:hover': {
          textDecoration: 'underline',
        },
      },
    }}
  >
    <span style={{ fontSize: '20px', lineHeight: '20px', paddingRight: '4px' }}>+</span>
    <span className='add-text'> Add Assignee</span>
  </Box>
));
