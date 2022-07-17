import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';

export const Comment: FC = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start' }}>
        <Box>
          <Avatar sx={{ width: '30px', height: '30px', flex: '0 0 30px' }} src={'/images/avatar1.jpg'}></Avatar>
        </Box>
        <Box sx={{ flex: '1 1 auto', ml: 2 }}>
          <Box sx={{ display: 'flex', mb: 0.5, alignItems:'center' }}>
            <Typography variant='body1'>James Bond</Typography>
            <Typography sx={{ ml: 2 }} variant='caption'>
              Jul 10, 2022, 3:41:21 PM
            </Typography>
          </Box>
          <Box>
            <Typography sx={{fontSize: 14}} variant='body1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ut quis inventore recusandae
              ducimus aliquam, vitae deleniti quibusdam fugiat facilis delectus quas modi rerum sed quia in corporis nam
              earum.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
