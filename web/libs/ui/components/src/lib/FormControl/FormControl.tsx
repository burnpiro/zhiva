import { default as MUIFormControl } from '@mui/material/FormControl';
export * from '@mui/material/FormControl';

import type { FormControlProps as MUIFormControlProps } from '@mui/material/FormControl';

/* eslint-disable-next-line */
export interface FormControlProps extends MUIFormControlProps {}

export function FormControl(props: FormControlProps) {
  return <MUIFormControl {...props}>{props.children}</MUIFormControl>;
}

export default FormControl;
