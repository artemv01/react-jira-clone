import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FC } from 'react';

interface Props {
  children: JSX.Element;
  text: string;
}
export const Label: FC<Props> = ({ children, text }) => {
  return (
    <Box>
      <Typography sx={{ mb: 1 }} variant='label2' color='text.secondary'>
        {text}
      </Typography>
      {children}
    </Box>
  );
};
