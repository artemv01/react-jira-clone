import {styled} from "@mui/material/styles";
import MuiInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { FC } from "react";

interface Props {
    onChange: (val: string) => void
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

export const TextField: FC<Props> = ({onChange}) => {
    return <StyledInput fullWidth={true} onChange={(event)=> onChange(event.target.value)}></StyledInput>
}
