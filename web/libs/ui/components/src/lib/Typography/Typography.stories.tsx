import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from './Typography';

export default {
  component: Typography,
  title: 'UI_ELEMENTS/Typography',
  args: {
    children:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    variant: 'body1',
    align: 'left',
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Header = Template.bind({});
Header.args = {
  children: 'Heading Text',
  variant: 'h2',
};
