import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ViewerMenu } from './ViewerMenu';
import { CornerstoneToolNames } from '../../../../../shared/constants/src';
import { DefaultMenuElements } from '@zhiva/react-contexts';

export default {
  component: ViewerMenu,
  title: 'Menu/ViewerMenu',
  args: {
    tools: DefaultMenuElements,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ViewerMenu>;

const Template: ComponentStory<typeof ViewerMenu> = (args) => (
  <ViewerMenu {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  activeTools: ['mouse'],
};

export const MultiActive = Template.bind({});
MultiActive.args = {
  activeTools: ['mouse', CornerstoneToolNames.Zoom, 'drawers'],
};

export const DisabledComponents = Template.bind({});
DisabledComponents.args = {
  disabledTools: ['mouse', 'drawers'],
};
