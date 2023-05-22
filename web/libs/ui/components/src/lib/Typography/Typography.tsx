import { default as MUITypography } from '@mui/material/Typography';
export * from '@mui/material/Typography';

import type { TypographyProps as MUITypographyProps } from '@mui/material/Typography';

/* eslint-disable-next-line */
export interface TypographyProps extends MUITypographyProps {}

export function Typography(props: TypographyProps) {
  return <MUITypography {...props}>{props.children}</MUITypography>;
}

export default Typography;
