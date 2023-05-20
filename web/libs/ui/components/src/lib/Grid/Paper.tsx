import { default as MUIPaper } from '@mui/material/Paper';
export * from '@mui/material/Paper';

import type { PaperProps as MUIPaperProps } from '@mui/material/Paper';

/* eslint-disable-next-line */
export interface PaperProps extends MUIPaperProps {}

export function Paper(props: PaperProps) {
  return <MUIPaper {...props}>{props.children}</MUIPaper>;
}

export default Paper;
