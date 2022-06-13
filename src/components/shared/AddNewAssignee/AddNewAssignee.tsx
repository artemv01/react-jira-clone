import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import IssueType from '../IssueType';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SvgIcon from '@mui/material/SvgIcon';

import { priorityTypes } from '../../../shared/PriorityTypes';
import { issueTypes } from '../../../shared/IssueTypes';
export const AddNewAssignee = forwardRef(({ onClick }, ref) => (
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