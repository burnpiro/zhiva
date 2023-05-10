import React, { useEffect, useState } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// import {
//   SnackbarUtilsConfigurator,
//   SnackbarProvider,
// } from '@zhiva/services-snackbar';
// import { darkTheme, snackbarClasses } from '../../../apps/app/src/theme/theme';
import {
  parameters as defaultParameters,
  globalTypes as defaultGlobalTypes,
  decorators as defaultDecorators,
} from '../../../.storybook/preview';
// import { initCornerstone } from '@zhiva/utils-cornerstone';

export const ThemeDecorator = (Story) => (
  <StyledEngineProvider injectFirst>
    {/*<ThemeProvider theme={darkTheme}>*/}
    <ThemeProvider>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  </StyledEngineProvider>
);

export const SnackbarDecorator = (Story) => (
  // <SnackbarProvider
  //   classes={{
  //     variantSuccess: snackbarClasses.success.backgroundColor,
  //     variantError: snackbarClasses.error.backgroundColor,
  //     variantWarning: snackbarClasses.warning.backgroundColor,
  //     variantInfo: snackbarClasses.info.backgroundColor,
  //   }}
  // >
  //   <SnackbarUtilsConfigurator />
    <Story />
  // </SnackbarProvider>
);

export const CornerstoneDecorator = (Story) => {
  const [isLoadingCS, setIsLoadingCS] = useState(true);
  useEffect(() => {
    const loadCornerstone = async () => {
      // await initCornerstone();

      setIsLoadingCS(false);
    };
    window.parent.document.getElementById('storybook-preview-iframe').setAttribute('allow', 'cross-origin-isolated');

    loadCornerstone();
  }, []);
  return <Story csLoaded={!isLoadingCS} />;
};

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
