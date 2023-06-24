import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MouseClickedIcon } from './MouseClickedIcon';

export default {
  component: MouseClickedIcon,
  title: 'UI_ELEMENTS/ICONS/MouseClickedIcon',
  args: {
    side: 'left',
  },
} as ComponentMeta<typeof MouseClickedIcon>;

const Template: ComponentStory<typeof MouseClickedIcon> = (args) => (
  <MouseClickedIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
