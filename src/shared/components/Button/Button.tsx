import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

export const CustomButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor:  theme.palette.button.primary,
  color: theme.typography.body2.color,
  padding: '0 12px',
  '&:hover': {
    backgroundColor: theme.palette.button.dark,
  },
  '& .MuiButtonBase-root': {
    display: 'none',
    backgroundColor: theme.palette.board.bg,
  },
}));
interface Props {
  children: any;
  [key: string]: any;
}
export const Button: FC<Props> = ({ children, ...rest }) => {
  return <CustomButton {...rest}>{children}</CustomButton>;
};
