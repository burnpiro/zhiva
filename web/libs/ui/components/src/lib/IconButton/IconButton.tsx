export { default as Icon } from '@mui/material/Icon';
export { default as SvgIcon } from '@mui/material/SvgIcon';
import { default as MUIIconButton } from '@mui/material/IconButton';
export * from '@mui/material/IconButton';

import type { IconButtonProps as MUIIconButtonProps } from '@mui/material/IconButton';

/* eslint-disable-next-line */
export interface IconButtonProps extends MUIIconButtonProps {}

export function IconButton(props: IconButtonProps) {
  return <MUIIconButton {...props}>{props.children}</MUIIconButton>;
}

export default IconButton;
