import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UiStudiesList } from './UiStudiesList';

import { studyList } from '../data/exampleStudyList';

export default {
  component: UiStudiesList,
  title: 'Studies_List/List',
  argTypes: { onStudySelect: { action: 'selectedStudy' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof UiStudiesList>;

const Template: ComponentStory<typeof UiStudiesList> = (args) => (
  <div style={{padding: '100px'}}>
    <UiStudiesList {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  studies: studyList,
};

export const NoStudies = Template.bind({});
NoStudies.args = {
  studies: new Map(),
};
