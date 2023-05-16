import { default as MUICheckbox } from '@mui/material/Checkbox';
export * from '@mui/material/Checkbox';

import type { CheckboxProps as MUICheckboxProps } from '@mui/material/Checkbox';

/* eslint-disable-next-line */
export interface CheckboxProps extends MUICheckboxProps {}

export function Checkbox(props: CheckboxProps) {
  return <MUICheckbox {...props} />;
}

export default Checkbox;
