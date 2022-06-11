import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
export function MainMenu(): JSX.Element {
  return (
    <List
      sx={{
        width: '100%',
      }}
    >
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            py: 1,
          }}
          component='a'
          href='/kanban'
        >
          <ListItemIcon
            sx={{
              width: '24px',
              minWidth: '24px',
              marginRight: '16px',
            }}
          >
            <ViewKanbanIcon
              sx={{
                color: 'text.primary',
              }}
            />
          </ListItemIcon>
          <ListItemText disableTypography primary={<Typography fontSize={15}>Kanban Board</Typography>} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon
            sx={{
              width: '24px',
              minWidth: '24px',
              marginRight: '16px',
            }}
          >
            <SettingsIcon
              sx={{
                color: 'text.primary',
              }}
            />
          </ListItemIcon>
          <ListItemText disableTypography primary={<Typography fontSize={15}>Project Settings</Typography>} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
