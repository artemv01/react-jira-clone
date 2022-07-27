import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FC, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SelectType from './SelectType';
import SelectPriority from './SelectPriority';
import SelectUser from './SelectUser';
import Label from '../../shared/components/Label';
import { editorFormats, editorModules } from '../../shared/editorConfig';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from '../../shared/components/ReactQuill';
import TextField from "../../shared/components/TextField";

interface Props {
    onClose: () => void
}

export const CreateIssue: FC<Props> = ({onClose}) => {
    const issueData ={
        type: '',
        priority: '',
        assignee: '',
        reporter: '',
        summary: '',
        text: '',
    }

    function submit() {
       console.log(issueData)
    }

    return (
        <Box sx={{ p: 3, width: '700px', background: (theme) => theme.palette.board.ticketBg }}>
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h1'>Create issue</Typography>
                <IconButton onClick={onClose} aria-label='close'>
                    <CloseIcon></CloseIcon>
                </IconButton>
            </Box>
            <Box>
                <Box sx={{ mb: 1 }}>
                    <Label text='Issue type'>
                        <SelectType onChange={(type) => issueData.type = type}></SelectType>
                    </Label>
                </Box>
                <Box sx={{ mb: 1 }}>
                    <Label text='Issue priority'>
                        <SelectPriority onChange={(val) => issueData.priority = val}></SelectPriority>
                    </Label>
                </Box>
                <Box sx={{ mb: 1 }}>
                    <Label text='Description'>
                        <Box
                            sx={{
                                '& .ql-container': {
                                    height: '170px',
                                },
                            }}
                        >
                            <ReactQuill
                                theme={'snow'}
                                onChange={(val) => issueData.text = val}
                                value={''}
                                modules={editorModules}
                                formats={editorFormats}
                            />
                        </Box>
                    </Label>
                </Box>
                <Box sx={{ mb: 1 }}>
                    <Label text='Reporter'>
                        <SelectUser onChange={(val) => issueData.reporter = val}></SelectUser>
                    </Label>
                </Box>
                <Box sx={{ mb: 1 }}>
                    <Label text='Short summary'>
                        <TextField onChange={(val)=> issueData.summary = val}></TextField>
                    </Label>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Label text='Assignees'>
                        <SelectUser onChange={(val) => issueData.assignee = val}></SelectUser>
                    </Label>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginTop: '16px',
                        '& > .MuiButton-root': {
                            marginRight: '8px',
                        },
                    }}
                >
                    <Button variant='contained' onClick={submit}>Create Issue</Button>
                    <Button variant='text' onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Box>
    );
};
