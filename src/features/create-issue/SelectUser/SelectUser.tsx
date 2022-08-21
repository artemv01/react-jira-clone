import { FC, useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '../../../shared/components/Select';
import { users } from '../../../shared/stubs/users';
import Avatar from '@mui/material/Avatar';
import DefaultProps from '../../../shared/model/DefaultProps';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
interface Props {
  onChange: (id: string | string[]) => void;
  onBlur?: () => void;
  multiple?: boolean;
  value: string[] | string;
}

const findUserById = (findId: string) => users.find(({ id }) => findId === id);

export const SelectUser: FC<Props> = ({ onChange, multiple, value, onBlur }) => {
  const [selected, setSelected] = useState<string[] | string>(value);
  useEffect(() => setSelected(value), [value]);
  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    if (Array.isArray(selected)) {
      const temp = [...selected];
      const deleteIdx = temp.indexOf(value);
      temp.splice(deleteIdx, 1);
      setSelected(temp);
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
    <Select
      multiple={multiple}
      onBlur={onBlur}
      onChange={(newVal: any) => {
        setSelected((selected) => {
          setSelected(newVal);
          return selected;
        });

        onChange(newVal);
      }}
      value={selected}
      renderValue={renderValue}
    >
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
