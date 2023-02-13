import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToolButton, ToolIcons } from './ToolButton';
import {
  CornerstoneToolNames,
  ToolDisplayNames,
} from '../../../../../shared/constants/src';
import MemoryIcon from '@mui/icons-material/Memory';
import ComputerIcon from '@mui/icons-material/Computer';
import React from 'react';

const icons: Record<string, React.ReactElement> = {
  ChipIcon: <MemoryIcon />,
  ComputerIcon: <ComputerIcon />,
};

export default {
  component: ToolButton,
  title: 'Menu/ToolButton',
  argTypes: {
    onClick: { action: 'clicked' },
    toolKey: {
      options: Object.keys(ToolIcons),
      control: {
        type: 'select',
      },
    },
  },
  args: {
    name: ToolDisplayNames[CornerstoneToolNames.Wwwc],
    isActive: true,
  },
} as ComponentMeta<typeof ToolButton>;

const Template: ComponentStory<typeof ToolButton> = (args) => (
  <ToolButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  toolKey: CornerstoneToolNames.Wwwc,
};

export const CustomIcons = Template.bind({});
CustomIcons.args = {
  customIcon: icons['ChipIcon'],
};
CustomIcons.argTypes = {
  customIcon: {
    options: Object.keys(icons),
    mapping: icons,
    control: {
      type: 'select',
    },
  },
};
