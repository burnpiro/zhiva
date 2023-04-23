import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { CornerstoneToolNames, ElementTypes } from '@zhiva/shared/constants';
import ToolButton, { ToolButtonProps } from '../ToolButton/ToolButton';
import { Divider } from '@mui/material';
import { isTouchDevice, useDevice } from 'use-ua-parser-js';
import MenuSelector, { MenuSelectorProps } from '../MenuSelector/MenuSelector';
import { DicomMenuItem } from '@zhiva/types';

const StyledBox = styled(Box)(({ theme }) => ({
  // width: 'fit-content',
  paddingRight: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  '& hr': {
    margin: theme.spacing(0, 0.5),
  },
}));

export const MENU_HEIGHT = 64;

export type SelectActionMethod = (toolKey: string, value: any) => void;
export type ButtonActionMethod = () => void;

export type MenuTool = DicomMenuItem & {
  isActive?: boolean;
  disabled?: boolean;
  args?: Record<string, any> | MenuSelectorProps | ToolButtonProps;
  activeTools?: string[];
  onAction?: ButtonActionMethod | SelectActionMethod;
};

const RenderTool = ({
  name = '',
  type,
  customIcon,
  toolKey,
  isActive,
  disabled,
  desktopOnly,
  touchOnly,
  customComponent,
  activeTools,
  onAction,
  args,
}: MenuTool): React.ReactElement => {
  const canUseOnlyTouch = isTouchDevice(useDevice());

  // Return empty element when Tool should be only visible on desktop
  if ((desktopOnly && canUseOnlyTouch) || (touchOnly && !canUseOnlyTouch)) {
    return <div />;
  }

  switch (type) {
    case ElementTypes.Button:
      return (
        <ToolButton
          name={name}
          isActive={Boolean(isActive)}
          toolKey={toolKey as CornerstoneToolNames}
          customIcon={customIcon}
          disabled={disabled}
          onClick={onAction as ButtonActionMethod | undefined}
          {...args}
        />
      );
    case ElementTypes.Divider:
      return <Divider orientation={'vertical'} flexItem />;
    case ElementTypes.Select:
      return (
        <MenuSelector
          name={name}
          toolKey={toolKey}
          disabled={disabled}
          onSelect={onAction as SelectActionMethod}
          activeItems={activeTools}
          {...args}
        />
      );
    case ElementTypes.Component:
      if (customComponent) {
        return customComponent;
      }
      return <div />;
    default:
      return <div />;
  }
};

/* eslint-disable-next-line */
export interface ViewerMenuProps {
  activeTools: string[];
  disabledTools: string[];
  tools: MenuTool[];
  handleItemClick: (itemKey: DicomMenuItem['toolKey']) => void;
  handleItemSelect: (itemKey: DicomMenuItem['toolKey'], value?: string) => void;
}

export function ViewerMenu({
  activeTools = [],
  disabledTools = [],
  tools,
  handleItemClick,
  handleItemSelect,
}: ViewerMenuProps) {
  return (
    <StyledBox
      sx={{ display: 'flex', alignItems: 'flex-start' }}
      aria-label={'dicom-navigation'}
    >
      <Box
        sx={{
          minHeight: MENU_HEIGHT,
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          overflowX: 'auto',
          flexGrow: 1,
        }}
      >
        {tools
          .filter((tool) => tool.placement !== 'right')
          .map((tool) => (
            <RenderTool
              {...tool}
              onAction={
                tool.onAction ||
                (tool.type === ElementTypes.Select && handleItemSelect) ||
                (tool.type === ElementTypes.Button && handleItemClick) ||
                undefined
              }
              activeTools={activeTools}
              isActive={
                tool.isActive || activeTools.includes(tool.toolKey as string)
              }
              disabled={
                tool.disabled || disabledTools.includes(tool.toolKey as string)
              }
              key={tool.toolKey || tool.name}
            />
          ))}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          minHeight: MENU_HEIGHT,
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          overflowX: 'auto',
          justifyContent: 'right',
          flexGrow: 1,
        }}
      >
        {tools
          .filter((tool) => tool.placement === 'right')
          .map((tool) => (
            <RenderTool
              {...tool}
              onAction={
                tool.onAction ||
                (tool.type === ElementTypes.Select && handleItemSelect) ||
                (tool.type === ElementTypes.Button && handleItemClick) ||
                undefined
              }
              activeTools={activeTools}
              isActive={
                tool.isActive || activeTools.includes(tool.toolKey as string)
              }
              disabled={
                tool.disabled || disabledTools.includes(tool.toolKey as string)
              }
              key={tool.toolKey || tool.name}
            />
          ))}
      </Box>
    </StyledBox>
  );
}

export default ViewerMenu;
