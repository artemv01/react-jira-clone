import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { issueTypes } from '../../../shared/IssueTypes';
import { IssueType } from '../../../shared/model/common';
import { IssueTypeBadge } from '../IssueTypeBadge/IssueTypeBadge';
interface Props {
  issueId: string;
  issueTypeId: string;
}
const MenuWrapper = styled(Menu)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '14px',
    paddingLeft: theme.spacing(1),
  },
}));
const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  width: 'fit-content',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  marginLeft: `-${theme.spacing(1)}`,
  borderRadius: '4px',
  '& .MuiTypography-root': {
    marginLeft: '8px',
  },
  '&:hover': {
    backgroundColor: theme.palette.button.primary,
  },
}));
export const IssueHeaderBadge: FC<Props> = ({ issueId, issueTypeId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [selected, setSelected] = useState<IssueType>({} as IssueType);
  const [types, setTypes] = useState(issueTypes);
  const initIssueTypeData = (issueTypeId: string) => {
    let typeIdx = issueTypes.findIndex((item) => item.id === issueTypeId);
    if (typeIdx === -1) {
      typeIdx = 0;
    }
    setSelected(issueTypes[typeIdx]);
    setTypes(issueTypes.filter((item, idx) => idx !== typeIdx));
    handleClose();
  };
  useEffect(() => {
    initIssueTypeData(issueTypeId);
  }, [issueId]);

  return (
    <div>
      <Wrapper onClick={handleClick}>
        <IssueTypeBadge id={selected.id}></IssueTypeBadge>
        <Typography variant='label' color='text.secondary'>
          {issueId}
        </Typography>
      </Wrapper>
      <MenuWrapper
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuList disablePadding={true}>
          {types.map((item) => (
            <MenuItem onClick={() => initIssues(item.id)} key={item.id}>
              <ListItemIcon>{item.img}</ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </MenuWrapper>
    </div>
  );
};
