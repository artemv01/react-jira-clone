import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/OutlinedInput';
import { FC } from 'react';

interface Props {
  onChange: (val: string) => void;
  onBlur: () => void;
  value: string;
}
const StyledInput = styled(MuiInput)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
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
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2b2b2b',
    fontSize: 16,
    padding: '4px 8px 4px 8px',
    transition: 'all 0.3s linear',
  },
}));

export const TextField: FC<Props> = ({ onChange, value, onBlur }) => {
  return (
    <StyledInput
      value={value}
      fullWidth={true}
      onBlur={onBlur}
      onChange={onChange as any}
    ></StyledInput>
  );
};
