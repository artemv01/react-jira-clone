import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import { FC } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import { issueTypes } from '../../../shared/IssueTypes';
import { DrawerWrapper, SearchInput } from './SearchDrawer.styles';

interface Props {
  isOpened: boolean;
  toggleCb: (val: boolean) => void;
}
export const SearchDrawer: FC<Props> = ({ toggleCb, isOpened }) => {
  const toggleSearchDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    toggleCb(open);
  };

  return (
    <DrawerWrapper open={isOpened} anchor={'left'} onClose={toggleSearchDrawer(false)}>
      <Box sx={{ width: '100%', height: '100%', background: '#ffffff', p: 3 }}>
        <SearchInput
          sx={{ mb: 4 }}
          fullWidth={true}
          id='input-with-icon-adornment'
          startAdornment={
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          }
          placeholder={'Search issues by summary, description..'}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant={'label'} color={'silent.silent1'} fontSize={12}>
            Recent issues
          </Typography>
        </Box>
        <Box>
          {new Array(4).fill(1).map((item, index) => (
            <Box
              key={index}
              className={'ticket-mini-card'}
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
                padding: '6px 6px 6px 0',
                mb: 1,
                '&:hover': { background: (theme) => theme.palette.hoverMark.primary, cursor: 'pointer' },
              }}
            >
              <Box sx={{ px: 1.5 }}>{issueTypes[1].img}</Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant={'body2'}
                  color={'silent.silent2'}
                  sx={{
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis ipsum, dolorem
                </Typography>
                <Typography color={'silent.silent1'} fontSize={12} textTransform={'uppercase'}>
                  story-1234
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </DrawerWrapper>
  );
};
