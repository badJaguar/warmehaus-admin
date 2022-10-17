import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type Item = {
  value: string
  name: string
}
interface BasicSelectProps {
 title: string
 menuItems: Item[]
 value: string
 onChange: (value: string) => void
}

export default function BasicSelect(props: BasicSelectProps) {
  const {title, menuItems, onChange, value} = props

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
          value={value}
          label={title}
          onChange={handleChange}
        >
          {
            menuItems.map(item => (
              <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}