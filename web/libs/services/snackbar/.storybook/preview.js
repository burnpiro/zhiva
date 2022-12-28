import React from 'react';

import {
  decorators as defaultDecorators,
  globalTypes as defaultGlobalTypes,
  parameters as defaultParameters,
} from '../../../../.storybook/preview';
import {
  ThemeDecorator,
  SnackbarDecorator,
} from '../../../storybook/.storybook/preview';

export const decorators = [
  ...defaultDecorators,
  ThemeDecorator,
  SnackbarDecorator,
];

export const parameters = {
  ...defaultParameters,
};

export const globalTypes = {
  ...defaultGlobalTypes,
};
