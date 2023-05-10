# services-snackbar

## Setup

Import services-snackbar provider to your main `.tsx` file:

```javascript
import {
  SnackbarProvider,
  SnackbarUtilsConfigurator,
} from '@zhiva/services-snackbar';
```

Add Provider and Util to your app:

```javascript
root.render(
  <StrictMode>
    <SnackbarProvider
      classes={{
        variantSuccess: services - snackbarClasses.success.backgroundColor,
        variantError: services - snackbarClasses.error.backgroundColor,
        variantWarning: services - snackbarClasses.warning.backgroundColor,
        variantInfo: services - snackbarClasses.info.backgroundColor,
      }}
    >
      <SnackbarUtilsConfigurator />a
      <App />
    </SnackbarProvider>
  </StrictMode>
);
```

Where `App` is your main application component.

## Usage

### Inside react component

With `useSnackbar` hook:

```javascript
import { useSnackbar } from '@zhiva/services-snackbar';

// Your component's code
export function MyComponent(props: MyComponentProps) {
  // get enqueueSnackbar
  const { enqueueSnackbar } = useSnackbar();

  // Do some stuff and enque new services-snackbar

  useEffect(() => {
    enqueueSnackbar('My component loaded', {
      variant: 'sucess',
    });
  }, []);
}
```

You can modify your services-snackbar with `options` (second parameter).

```javascript
{
  variant?: 'error' | 'success' | 'warning' | 'info' | 'default', // different color schemas (defined in SnackbarProvider)
  preventDuplicate?: boolean, // prevent two services-snackbars with the same message appear at once
  persist?: boolean, // make services-snackbar stay on the screen
}
```

### Inside services

```javascript
import SnackbarGenerator from '@zhiva/services-snackbar';

// your code

SnackbarGenerator.success('Success message');
```

There are multiple endpoints available:

```javascript
SnackbarGenerator.success(msg: string);
SnackbarGenerator.warning(msg: string);
SnackbarGenerator.info(msg: string);
SnackbarGenerator.error(msg: string);
SnackbarGenerator.toast(
  msg: string,
  variant: 'error' | 'success' | 'warning' | 'info' | 'default'
);
```

## Running unit tests

Run `nx test services-snackbar` to execute the unit tests via [Jest](https://jestjs.io).
