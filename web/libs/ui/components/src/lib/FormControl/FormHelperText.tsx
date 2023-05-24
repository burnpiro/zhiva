import { default as MUIFormHelperText } from '@mui/material/FormHelperText';
export * from '@mui/material/FormHelperText';

import type { FormHelperTextProps as MUIFormHelperTextProps } from '@mui/material/FormHelperText';

/* eslint-disable-next-line */
export interface FormHelperTextProps extends MUIFormHelperTextProps {}

export function FormHelperText(props: FormHelperTextProps) {
  return <MUIFormHelperText {...props}>{props.children}</MUIFormHelperText>;
}

export default FormHelperText;
