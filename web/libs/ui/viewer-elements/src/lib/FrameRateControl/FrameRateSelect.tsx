import React, { FC } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function getStyles(value: number, currValue: number, theme: Theme) {
  return {
    fontWeight:
      currValue === value
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface FrameRateSelectProps {
  onChange: (event: SelectChangeEvent<number>) => void;
  values: number[];
  selectedValue: number;
}

export function FrameRateSelect({
  onChange,
  values,
  selectedValue,
}: FrameRateSelectProps) {
  const theme = useTheme();

  return (
    <FormControl sx={{ m: 0, width: 75, p: 0, ml: 2 }}>
      <Select
        sx={{ height: 48 }}
        displayEmpty
        value={selectedValue}
        onChange={onChange}
        input={<Input />}
        renderValue={(selected) => {
          if (selected == null || selected === 0) {
            return <em>None</em>;
          }

          return selected + 'fps';
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Frame Rate select' }}
      >
        {values.map((value) => (
          <MenuItem
            key={value}
            value={value}
            style={getStyles(value, selectedValue, theme)}
          >
            {value + 'fps'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FrameRateSelect;
