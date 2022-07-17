import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useRef, useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import IssueType from '../IssueType';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { IssueTypeId, issueTypes } from '../../../shared/IssueTypes';
interface Props {
  issueId: string;
  issueTypeId: IssueTypeId;
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [selected, setSelected] = useState({});
  const [types, setTypes] = useState(issueTypes);
  const initIssues = (issueTypeId: IssueTypeId) => {
    let issueIdx = issueTypes.findIndex((item) => item.id === issueTypeId);
    if (issueIdx === -1) {
      issueIdx = 0;
    }
    setSelected(issueTypes[issueIdx]);
    setTypes(issueTypes.filter((item, idx) => idx !== issueIdx));
    handleClose();
  };
  useEffect(() => {
    initIssues(issueTypeId);
  }, [issueId]);

  return (
    <div>
      <Wrapper onClick={handleClick}>
        <IssueType type={selected.id}></IssueType>
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