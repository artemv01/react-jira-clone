/* eslint-disable max-len */
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';

export const GithubIcon = ({ cursor = 'pointer', ...props }) => {
  return (
    <Box sx={{ cursor, display: 'flex', alignItems: 'center' }}>
      <SvgIcon {...props}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1195 1195'>
          <path d='M85.333 653q0 166 95.5 298.5t247.5 185.5q6 1 10 1t6.5-1.5 4-3 2-5 .5-4.5v-101q-37 4-66-.5t-45.5-14-29-23.5-17-25.5-9-24-5.5-14.5q-9-15-27-27.5t-27-20-2-14.5q50-26 113 66 34 51 119 30 10-41 40-70-116-21-172-86t-56-158q0-87 55-151-22-65 6-137 29-2 65 11.5t50.5 23 25.5 17.5q57-16 128.5-16t129.5 16q13-9 29-19t49-21.5 61-9.5q27 71 6 135 56 64 56 152 0 92-56.5 157.5t-171.5 85.5q43 43 43 104v129q0 1 1 3 0 6 .5 9t4.5 6 11 3q154-52 251.5-185.5t97.5-300.5q0-104-40.5-199t-109-163.5-163.5-109-199-40.5-199 40.5-163.5 109-109 163.5-40.5 199z'></path>
        </svg>
      </SvgIcon>
    </Box>
  );
};
