import { default as MUIButton } from '@mui/material/Button';
export * from '@mui/material/Button';

import type { ButtonProps as MUIButtonProps } from '@mui/material/Button';

/* eslint-disable-next-line */
export interface ButtonProps extends MUIButtonProps {}

export function Button(props: ButtonProps) {
  return <MUIButton {...props}>{props.children}</MUIButton>;
}

export default Button;
