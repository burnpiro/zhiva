import Slide from '@mui/material/Slide';
import { styled, Theme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { CSSProperties, ReactNode, RefObject } from 'react';

import {
  DRAWER_DIRECTIONS,
  DrawerHeights,
  DrawerWidths,
} from '@zhiva/utils';
import { SxProps } from '@mui/system';

const StyledDrawerContainer = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  zIndex: 2,
  overflowY: 'auto',
}));

/* eslint-disable-next-line */
export interface DrawerProps {
  /**
   * Container in which Drawer should be displayed
   */
  containerRef: RefObject<HTMLDivElement>;
  /**
   * If `true`, displays the drawer.
   */
  showDrawer: boolean;
  /**
   * Position of the drawer, relative to containerRef
   * @default 'left'
   */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * Width of the drawer
   * @default DrawerWidths.DEFAULT
   */
  width?: number;
  /**
   * Height of the drawer, if not specified it will fill the containerRef elementHeight
   * @default 300
   */
  height?: number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * List of class names
   */
  classes?: string[];
  /**
   * List of class names
   */
  styles?: CSSProperties;
}

export function Drawer({
  containerRef,
  showDrawer,
  children,
  height,
  width,
  sx = {},
  position = 'left',
  styles = {},
  classes = [],
}: DrawerProps) {
  const offsetTop = containerRef.current?.offsetTop || 0;
  const containerHeight = containerRef?.current?.clientHeight || 0;
  const drawerHeight =
    height ||
    (position === 'top' || position === 'bottom'
      ? DrawerHeights.DEFAULT
      : containerRef?.current?.clientHeight) ||
    DrawerHeights.DEFAULT;
  const drawerWidth =
    width ||
    (position === 'top' || position === 'bottom'
      ? '100%'
      : DrawerWidths.DEFAULT) ||
    DrawerWidths.DEFAULT;

  const direction = DRAWER_DIRECTIONS[position];

  return (
    <Slide
      direction={direction}
      mountOnEnter
      unmountOnExit
      in={showDrawer}
      container={containerRef.current}
    >
      <StyledDrawerContainer
        style={{
          top:
            position !== 'bottom'
              ? offsetTop
              : offsetTop + containerHeight - drawerHeight,
          left: position !== 'right' ? 0 : 'unset',
          right: position === 'right' ? 0 : 'unset',
          ...styles,
        }}
        sx={{ height: drawerHeight, width: drawerWidth, ...sx }}
        className={classes.join(' ')}
      >
        {children}
      </StyledDrawerContainer>
    </Slide>
  );
}

export default Drawer;
