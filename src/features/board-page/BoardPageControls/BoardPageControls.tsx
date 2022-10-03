import Search from '@mui/icons-material/Search';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { FC } from 'react';
import { BoardPageControlsWrapper, SearchInput } from './BoardPageControls.styles';
import SelectUser from '../../../shared/components/SelectUser';
import { IssueFilters } from '../../../shared/model/common';
import { defaultIssueFilters } from '../../../shared/stubs/defaultIssueFilters';
interface Props {
  onChange: (filters: IssueFilters) => void;
  value: IssueFilters;
}
export const BoardPageControls: FC<Props> = ({ onChange, value }) => {
  const updateFilters = (newFilters: IssueFilters) => {
    onChange(newFilters);
  };
  const showResetButton = () => {
    return JSON.stringify(defaultIssueFilters) !== JSON.stringify(value);
  };
  return (
    <BoardPageControlsWrapper>
      <FormControl size='small' className='search-input' variant='standard'>
        <SearchInput
          onChange={(event) => {
            updateFilters({ ...value, search: event.target.value });
          }}
          startAdornment={
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>
      <SelectUser
        value={value.assignees}
        onChange={(newUsers: string[]) => {
          updateFilters({ ...value, assignees: newUsers });
        }}
      ></SelectUser>
      <List>
        <ListItem
          disablePadding
          onClick={() => updateFilters({ ...value, onlyCurrentUserIssues: !value.onlyCurrentUserIssues })}
        >
          <ListItemButton selected={value.onlyCurrentUserIssues}>
            <ListItemText disableTypography primary={<Typography fontSize={15}>Only My Issues</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem
          sx={{
            marginLeft: '12px',
          }}
          selected={value.ignoreResolved}
          onClick={() => updateFilters({ ...value, ignoreResolved: !value.ignoreResolved })}
          disablePadding
        >
          <ListItemButton>
            <ListItemText disableTypography primary={<Typography fontSize={15}>Ignore Resolved</Typography>} />
          </ListItemButton>
        </ListItem>
        {showResetButton() && (
          <ListItem
            sx={{
              marginLeft: '12px',
              paddingLeft: '12px',
              borderLeft: '1px solid rgba(0,0,0,0.2)',
            }}
            disablePadding
            onClick={() => updateFilters({ ...value, ...defaultIssueFilters })}
          >
            <ListItemButton selected={true}>
              <ListItemText disableTypography primary={<Typography fontSize={15}>Clear All</Typography>} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </BoardPageControlsWrapper>
  );
};
