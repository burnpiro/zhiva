import { default as MUISelect } from '@mui/material/Select';
export * from '@mui/material/Select';

import type { SelectProps as MUISelectProps } from '@mui/material/Select';

/* eslint-disable-next-line */
export interface SelectProps extends MUISelectProps {}

export function Select(props: SelectProps) {
  return <MUISelect {...props}>{props.children}</MUISelect>;
}

export default Select;
