import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PolygonIcon } from './PolygonIcon';

export default {
  component: PolygonIcon,
  title: 'UI_ELEMENTS/ICONS/PolygonIcon',
} as ComponentMeta<typeof PolygonIcon>;

const Template: ComponentStory<typeof PolygonIcon> = (args) => (
  <PolygonIcon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
