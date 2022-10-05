import { FC } from 'react';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '../../../shared/components/Select';
import { users } from '../../../shared/stubs/users';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
interface Props {
  onChange: (id: string | string[]) => void;
  onBlur?: () => void;
  multiple?: boolean;
  value: string[] | string;
  setValue?: (newVal: any) => void;
}

const findUserById = (findId: string) => users.find(({ id }) => findId === id);

export const SelectUser: FC<Props> = ({ onChange, multiple, value, onBlur, setValue }) => {
  const handleDelete = (e: React.MouseEvent, deleteItem: string) => {
    e.preventDefault();
    console.log(value)
    console.log(setValue)

    if (Array.isArray(value) && setValue) {
      const temp = [...value];
      const deleteIdx = temp.indexOf(deleteItem);
      temp.splice(deleteIdx, 1);
      console.log(temp)
      setValue(temp);
    }
  };

  let renderValue;
  if (multiple) {
    renderValue = (selected: any) =>
      (selected as string[]).map((id) => {
        const userData = findUserById(id);
        if (!userData) {
          return '';
        }

        return (
          <Chip
            key={id}
            label={userData.name}
            clickable
            deleteIcon={<CloseIcon onMouseDown={(event) => event.stopPropagation()} />}
            sx={{
              margin: '2px 6px 2px 0px',

              '& .MuiChip-avatar': {
                width: '20px',
                height: '20px',
              },
            }}
            avatar={<Avatar alt={userData.name} src={userData.avatarUrl} />}
            onDelete={(e) => handleDelete(e, id)}
          />
        );
      });
  } else {
    renderValue = (id: any) => {
      const userData = findUserById(id);
      if (!userData) {
        return '';
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            padding: '0 0px',
          }}
        >
          <Avatar alt={userData.name} src={userData.avatarUrl} sx={{ width: 24, height: 24 }} />
          <ListItemText sx={{ pl: '8px' }} primaryTypographyProps={{ variant: 'body1', fontSize: '13px' }}>
            {userData.name}
          </ListItemText>
        </Box>
      );
    };
  }

  return (
    <Select multiple={multiple} onBlur={onBlur} onChange={onChange} value={value} renderValue={renderValue}>
      {users.map((item) => (
        <MenuItem sx={{ px: '8px' }} key={item.id} value={item.id}>
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              padding: '0 8px',
            }}
          >
            <Avatar alt={item.name} src={item.avatarUrl} sx={{ width: 20, height: 20 }} />
            <ListItemText sx={{ pl: '8px' }} primaryTypographyProps={{ variant: 'body1', fontSize: '13px' }}>
              {item.name}
            </ListItemText>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};
