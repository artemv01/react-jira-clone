import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
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
          href='/project/board'
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
      
    </List>
  );
}
