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
import {styled} from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#d9d9d9',
    transition: 'all 0.3s linear',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#40a9ff',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #40a9ff',
    boxShadow: '0 0 0 2px #1890ff33',
    outline: 0,
  },
  '& .MuiOutlinedInput-input': {
    padding: '2px 8px  2px 8px',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  '& .MuiMenuItem-root': {
    padding: '2px 8px  2px 8px',
  },
  '& .MuiListItemIcon-root': {
    width: '24px',
    minWidth: '24px',
  },

}));
interface Props {
  children: any[];
  onChange: (newVal: any) => void;
  defaultValue: any;
}
export const Select: FC<Props> = ({ children, onChange, defaultValue }) => {
  return (
    <FormControl fullWidth>
      <StyledSelect
        onChange={(event) => onChange(event.target.value)}
        displayEmpty
        input={<OutlinedInput />}
        defaultValue={defaultValue}
      >
        {/* <MenuItem value={0}>
          <Avatar alt='John Johnson' src='/images/avatar1.jpg' sx={{ width: 20, height: 20 }} />
          <ListItemText>John Johnson</ListItemText>
        </MenuItem> */}
        {children}
      </StyledSelect>
    </FormControl>
  );
};
