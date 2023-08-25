import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
// @ts-ignore
import { SketchPicker } from 'react-color';
import { styled } from '@mui/material/styles';
import { parseCSColorToRGB, parseStringToRGB } from '@zhiva/utils-cornerstone';
import Box from '@mui/material/Box';
import { BrushColorClass } from '@zhiva/utils';

interface ColorPickerProps {
  onChange: (id: string, color: BrushColorClass['color']) => void;
  id: string;
  selectedColor: BrushColorClass['color'];
}

const defaultColor = [100, 100, 200, 100] as BrushColorClass['color'];

type ColorPickerFormat = { rgb: { r: number; g: number; b: number } };

export default function ColorPicker({
  onChange,
  id,
  selectedColor = defaultColor,
}: ColorPickerProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [color, setColor] = useState<ColorPickerFormat>({
    rgb: parseCSColorToRGB(selectedColor),
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (color: ColorPickerFormat) => {
    setColor(color);
  };

  const handleChangeComplete = (color: ColorPickerFormat) => {
    setColor(color);
    onChange(id, [color.rgb.r, color.rgb.g, color.rgb.b, 100]);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? 'color-popover' : undefined;

  return (
    <Box
      sx={{
        width: '54px',
        height: '24px',
        borderRadius: '2px',
      }}
    >
      <Button
        style={{
          padding: '4px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          position: 'relative',
          height: '30px',
          width: '30px'
        }}
        onClick={handleClick}
        aria-describedby={id}
        variant="text"
      >
        <div
          style={{
            padding: 10,
            background: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
          }}
        />
      </Button>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <SketchPicker
          color={color}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
        />
      </Popover>
    </Box>
  );
}
