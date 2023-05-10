import React from 'react';

import {
  globalTypes as defaultGlobalTypes,
  parameters as defaultParameters,
  decorators as defaultDecorators,
} from '../../../../.storybook/preview';
import {
  ThemeDecorator,
  SnackbarDecorator,
  CornerstoneDecorator,
} from '../../../storybook/.storybook/preview';

export const decorators = [
  ...defaultDecorators,
  ThemeDecorator,
  SnackbarDecorator,
  CornerstoneDecorator,
];

export const parameters = {
  ...defaultParameters,
};

export const globalTypes = {
  ...defaultGlobalTypes,
};
