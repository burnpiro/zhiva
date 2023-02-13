import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import { SvgIconProps } from '@mui/material/SvgIcon';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import HeightIcon from '@mui/icons-material/Height';
import Crop54Icon from '@mui/icons-material/Crop54';
import Brush from '@mui/icons-material/Brush';

import { ScrollIcon, PolygonIcon } from '@zhiva/ui-components';
import { ToolTypes } from '@zhiva/types';

export interface ToolButtonProps {
  name: string;
  isActive: boolean;
  toolKey?: ToolTypes;
  customIcon?: React.ReactElement;
  size?: IconButtonProps['size'];
  fontSize?: SvgIconProps['fontSize'];
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  placement?: TooltipProps['placement'];
}

export const ToolIcons: Record<string, React.ElementType> = {
  Wwwc: BrightnessMediumIcon,
  StackScroll: ScrollIcon,
  Zoom: ZoomInIcon,
  Pan: OpenWithIcon,
  Rotate: ScreenRotationIcon,
  Length: HeightIcon,
  RectangleROI: Crop54Icon,
  PlanarFreehandROI: PolygonIcon,
  Brush: Brush,
};

export function ToolButton({
  toolKey,
  name,
  isActive,
  onClick,
  customIcon,
  size = 'large',
  fontSize = 'medium',
  disabled = false,
  placement,
}: ToolButtonProps) {
  const SelectedIcon: React.ElementType | null =
    toolKey && ToolIcons[toolKey] ? ToolIcons[toolKey] : null;
  const isDisabled = disabled || onClick == null;
  return (
    <Box>
      <Tooltip title={name} placement={placement}>
        <IconButton
          disabled={isDisabled}
          onClick={onClick}
          aria-label={`${name}-button`}
          component={'span'}
          size={size}
        >
          {customIcon
            ? React.cloneElement(customIcon, {
                fontSize: fontSize,
                color: isActive ? 'action' : 'disabled',
              })
            : SelectedIcon && (
                <SelectedIcon
                  fontSize={fontSize}
                  color={isActive ? 'action' : 'disabled'}
                />
              )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ToolButton;
