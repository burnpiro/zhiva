import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuItem } from './MenuItem';

export default {
  component: MenuItem,
  title: 'UI_ELEMENTS/DicomMenuItem',
  args: {
    children: 'Menu Item Text',
  },
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (args) => (
  <MenuItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
