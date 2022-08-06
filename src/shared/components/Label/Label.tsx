import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import styledEngine from '@mui/styled-engine';
import MuiSelect from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

interface Props {
  children: JSX.Element;
  text: string;
}
export const Label: FC<Props> = ({children, text}) => {
  return (
    <Box>
      <Typography sx={{ mb: 1 }} variant='label2' color='text.secondary'>
        {text}
      </Typography>
      {children}
    </Box>
  );
};
