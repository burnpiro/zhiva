import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScrollIcon } from './ScrollIcon';

export default {
  component: ScrollIcon,
  title: 'UI_ELEMENTS/ICONS/ScrollIcon',
} as ComponentMeta<typeof ScrollIcon>;

const Template: ComponentStory<typeof ScrollIcon> = (args) => (
  <ScrollIcon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
