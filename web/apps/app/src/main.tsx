import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {
  SnackbarProvider,
  SnackbarUtilsConfigurator,
} from '@zhiva/services-snackbar';

import App from './app/app';

import { darkTheme, snackbarClasses } from './theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider
          classes={{
            variantSuccess: snackbarClasses.success.backgroundColor,
            variantError: snackbarClasses.error.backgroundColor,
            variantWarning: snackbarClasses.warning.backgroundColor,
            variantInfo: snackbarClasses.info.backgroundColor,
          }}
        >
          <CssBaseline />
          <BrowserRouter>
            <SnackbarUtilsConfigurator />
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
