import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface Props {
  message: string | undefined;
}
export const ErrorMessage: FC<Props> = ({ message }) => <Typography fontSize={12} color="red">{message}</Typography>;
