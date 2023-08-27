import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ViewportOverlay } from './ViewportOverlay';
import MemoryIcon from '@mui/icons-material/Memory';
import ComputerIcon from '@mui/icons-material/Computer';
import React from 'react';

const icons: Record<string, React.ReactElement> = {
  ChipIcon: <MemoryIcon />,
  ComputerIcon: <ComputerIcon />,
};

export default {
  component: ViewportOverlay,
  title: 'VIEWER/ViewportOverlay',
  args: {
    scale: 1,
    windowWidth: 80,
    windowCenter: 20,
    imageIdIndex: 0,
    stackSize: 20,
    imageId: 'test',
    frameRate: 10,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ViewportOverlay>;

const Template: ComponentStory<typeof ViewportOverlay> = (args) => (
  <ViewportOverlay {...args} />
);

export const Primary = Template.bind({});
Primary.args = {

};

