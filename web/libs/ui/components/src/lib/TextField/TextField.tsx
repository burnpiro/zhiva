import { default as MUITextField } from '@mui/material/TextField';
export * from '@mui/material/TextField';

import type { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

/* eslint-disable-next-line */
export type TextFieldProps = MUITextFieldProps & {};

export function TextField(props: TextFieldProps) {
  return <MUITextField {...props} />;
}

export default TextField;
