import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DicomCell } from './DicomCell';

import { studyList } from '../../data/exampleStudyList';

export default {
  component: DicomCell,
  title: 'Studies_List/DicomCell',
} as ComponentMeta<typeof DicomCell>;

const Template: ComponentStory<typeof DicomCell> = (args) => (
  <table>
    <tbody>
      <tr>
        <DicomCell {...args} />
      </tr>
    </tbody>
  </table>
);

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  value: 'test value',
};

export const Date = Template.bind({});
Date.args = {
  type: 'date',
  value: '20190805',
};

export const Modality = Template.bind({});
Modality.args = {
  type: 'modality',
  value: ['MA', 'SEG'],
};
