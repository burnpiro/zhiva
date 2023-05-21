import { default as MUIMenuItem } from '@mui/material/MenuItem';
export * from '@mui/material/MenuItem';

import type { MenuItemProps as MUIMenuItemProps } from '@mui/material/MenuItem';

/* eslint-disable-next-line */
export interface MenuItemProps extends MUIMenuItemProps {}

export function MenuItem(props: MenuItemProps) {
  return <MUIMenuItem {...props}>{props.children}</MUIMenuItem>;
}

export default MenuItem;
