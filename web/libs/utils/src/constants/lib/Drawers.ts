import type { SlideProps } from '@mui/material';

export enum DrawerWidths {
  DEFAULT = 290,
  SERIES = 244,
  ANNOTATION = 290,
  SEGMENTATION= 250,
}

export enum DrawerHeights {
  DEFAULT = 300,
}

/**
 * Mapping between Drawer's position and sliding direction
 */
export const DRAWER_DIRECTIONS: Record<string, SlideProps['direction']> = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};
