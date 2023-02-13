import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuSelector } from './MenuSelector';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import FormatShapesOutlinedIcon from '@mui/icons-material/FormatShapesOutlined';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

export default {
  component: MenuSelector,
  title: 'Menu/MenuSelector',
  argTypes: {
    onSelect: { action: 'select' },
  },
  args: {
    name: 'Sample Select',
  },
} as ComponentMeta<typeof MenuSelector>;

const Template: ComponentStory<typeof MenuSelector> = (args) => (
  <MenuSelector {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  items: [
    {
      itemKey: 'firstKey',
      name: 'First Item',
    },
    {
      itemKey: 'secondKey',
      name: 'Second Item',
    },
  ],
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  mainIcon: <DashboardCustomizeOutlinedIcon />,
  items: [
    {
      itemKey: 'firstKey',
      name: 'Left icon',
      icon: <FormatShapesOutlinedIcon />,
    },
    {
      itemKey: 'secondKey',
      name: 'Right icon ',
      icon: <ScatterPlotIcon />,
      iconPosition: 'right',
    },
  ],
};
