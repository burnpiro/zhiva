import React from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {
  SnackbarUtilsConfigurator,
  SnackbarProvider,
} from '@zhiva/services-snackbar';
import { darkTheme, snackbarClasses } from '../../../apps/app/src/theme/theme';
import {
  parameters as defaultParameters,
  globalTypes as defaultGlobalTypes,
  decorators as defaultDecorators,
} from '../../../.storybook/preview';

export const ThemeDecorator = (Story) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  </StyledEngineProvider>
);
export const SnackbarDecorator = (Story) => (
  <SnackbarProvider
    classes={{
      variantSuccess: snackbarClasses.success.backgroundColor,
      variantError: snackbarClasses.error.backgroundColor,
      variantWarning: snackbarClasses.warning.backgroundColor,
      variantInfo: snackbarClasses.info.backgroundColor,
    }}
  >
    <SnackbarUtilsConfigurator />
    <Story />
  </SnackbarProvider>
);

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
