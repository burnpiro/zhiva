import { default as MUIInputLabel } from '@mui/material/InputLabel';
export * from '@mui/material/InputLabel';

import type { InputLabelProps as MUIInputLabelProps } from '@mui/material/InputLabel';

/* eslint-disable-next-line */
export interface InputLabelProps extends MUIInputLabelProps {}

export function InputLabel(props: InputLabelProps) {
  return <MUIInputLabel {...props}>{props.children}</MUIInputLabel>;
}

export default InputLabel;
