import { themes } from '@storybook/theming';
import zhivaTheme from './zhivaTheme';

export const parameters = {
  layout: 'centered',
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: '#121212',
      },
      {
        name: 'lighter',
        value: '#303030',
      },
    ],
  },
  docs: {
    theme: zhivaTheme,
  },
};

export const decorators = [];

export const globalTypes = {
  // theme: {
  //   name: 'Theme',
  //   description: 'Global theme for components',
  //   defaultValue: 'dark',
  //   toolbar: {
  //     icon: 'circlehollow',
  //     // Array of plain string values or DicomMenuItem shape (see below)
  //     items: ['dark'],
  //     // Property that specifies if the name of the item will be displayed
  //     showName: true,
  //     // Change title based on selected value
  //     dynamicTitle: true,
  //   },
  // },
};
