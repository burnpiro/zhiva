import { default as MUIGrid } from '@mui/material/Grid';
export * from '@mui/material/Grid';

import type { GridProps as MUIGridProps } from '@mui/material/Grid';

/* eslint-disable-next-line */
export interface GridProps extends MUIGridProps {}

export function Grid(props: GridProps) {
  return <MUIGrid {...props}>{props.children}</MUIGrid>;
}

export default Grid;
