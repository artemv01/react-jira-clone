import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import { FC, useState } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import { DrawerWrapper, SearchInput } from './SearchDrawer.styles';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { IssueRenderData, selectMergedIssues } from '../../../store/issuesSlice';

interface Props {
  isOpened: boolean;
  toggleCb: (val: boolean) => void;
}
export const SearchDrawer: FC<Props> = ({ toggleCb, isOpened }) => {
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const issues = useAppSelector(selectMergedIssues);
  const toggleSearchDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    toggleCb(open);
  };

  const searchFilter = (issue: IssueRenderData): boolean => {
    if (search?.length) {
      const searchRegexp = new RegExp(search, 'i');
      if (!searchRegexp.test(issue.text) && !searchRegexp.test(issue.title)) {
        return false;
      }
    }

    return true;
  };

  return (
    <DrawerWrapper open={isOpened} anchor={'left'} onClose={toggleSearchDrawer(false)}>
      <Box sx={{ width: '100%', height: '100%', background: '#ffffff', p: 3 }}>
        <SearchInput
          sx={{ mb: 4 }}
          fullWidth={true}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
          {issues &&
            issues?.filter(searchFilter).map((item, index) => (
              <Box
                key={index}
                className={'issue-mini-card'}
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  alignItems: 'center',
                  padding: '6px 6px 6px 0',
                  mb: 1,
                  '&:hover': { background: (theme) => theme.palette.hoverMark.primary, cursor: 'pointer' },
                }}
              >
                <Box sx={{ px: 1.5 }}>
                  <img src={item.type?.img} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant={'body2'}
                    color={'silent.silent2'}
                    sx={{
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography color={'silent.silent1'} fontSize={12} textTransform={'uppercase'}>
                    {item.publicId}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </DrawerWrapper>
  );
};
