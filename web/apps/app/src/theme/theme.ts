import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { enUS } from '@mui/material/locale';
import darkScrollbar from '@mui/material/darkScrollbar';

const darkTheme = responsiveFontSizes(
  createTheme(
    {
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: darkScrollbar(),
          },
        },
      },
      palette: {
        action: {
          active: 'rgba(255,255,255, 0.87)',
          hover: 'rgba(255,255,255,0.08)',
          selected: 'rgba(255,255,255,0.16)',
          disabled: 'rgba(255,255,255,0.3)',
          disabledBackground: 'rgba(255,255,255,0.12)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        common: { black: '#121212', white: '#bfbfbf' },
        background: { paper: '#121212', default: '#303030' },
        mode: 'dark',
        primary: {
          light: '#aee5f9',
          main: '#34bdf0',
          dark: '#005e98',
        },
        secondary: {
          light: '#D1C0FF',
          main: '#936DFF',
          dark: '#5C29FF',
        },
        error: { light: '#e49cad', main: '#CF6679', dark: '#b75463' },
        warning: { light: '#ffe0b2', main: '#FFB74D', dark: '#fb8d00' },
        info: { light: '#b3e4fc', main: '#4fc3f7', dark: '#0b99e4' },
        success: { light: '#c8e6c9', main: '#81c784', dark: '#43a048' },
        text: {
          primary: 'rgba(255,255,255, 0.87)',
          secondary: 'rgba(255,255,255, 0.54)',
          disabled: 'rgba(255,255,255, 0.38)',
        },
      },
    },
    enUS
  )
);

const snackbarClasses = {
  success: { backgroundColor: '#2EA32C' },
  error: { backgroundColor: '#b00020' },
  warning: { backgroundColor: '#E46C21' },
  info: { backgroundColor: '#34bdf0' },
};

export { darkTheme, snackbarClasses };
