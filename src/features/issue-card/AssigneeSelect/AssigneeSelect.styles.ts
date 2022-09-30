import Menu from "@mui/material/Menu";
import {styled} from "@mui/material/styles";

export const AssigneeMenu = styled(Menu)(({ theme }) => ({
    '& .MuiTypography-root': {
      fontSize: '14px',
      paddingLeft: theme.spacing(1),
    },
  }));