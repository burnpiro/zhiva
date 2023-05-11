import { default as MUIBadge } from '@mui/material/Badge';
export * from '@mui/material/Badge';

import type { BadgeProps as MUIBadgeProps } from '@mui/material/Badge';

/* eslint-disable-next-line */
export interface BadgeProps extends MUIBadgeProps {}

export function Badge(props: BadgeProps) {
  return <MUIBadge {...props}>{props.children}</MUIBadge>;
}

export default Badge;
