import { FC, ReactNode } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MuiSelect from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import React from 'react';

const StyledSelect = styled(MuiSelect)(() => ({
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
    padding: '4px 8px  4px 8px',
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
  onBlur?: () => void;
  value: any;
  multiple?: boolean;
  renderValue?: (selected: any) => ReactNode;
}

export const Select: FC<Props> = ({ children, onChange, onBlur, value, multiple, renderValue }) => {
  return (
    <FormControl fullWidth>
      <StyledSelect
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        displayEmpty
        input={<OutlinedInput />}
        value={value}
        multiple={multiple}
        renderValue={renderValue}
      >
        {children}
      </StyledSelect>
    </FormControl>
  );
};
