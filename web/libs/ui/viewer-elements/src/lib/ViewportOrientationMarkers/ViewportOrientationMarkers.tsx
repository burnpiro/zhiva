import { styled } from '@mui/material/styles';
import { Types } from '@cornerstonejs/core';
import { getOrientationMarkers } from './helpers/getOrientationMarkers';
import { getCosinesFromCS } from './helpers/getCosinesFromCS';

const PREFIX = 'ViewportOrientationMarkers';

const classes = {
  top: `${PREFIX}-top-mid`,
  left: `${PREFIX}-left-mid`,
  bottom: `${PREFIX}-bottom-mid`,
  right: `${PREFIX}-right-mid`,
};

const MarkerElement = styled('div')(({ theme }) => ({
  position: 'absolute',
  fontWeight: 400,
  color: '#ccc',
  fontSize: 14,

  [`&.${classes.top}`]: {
    top: 5,
    left: '50%',
  },

  [`&.${classes.left}`]: {
    top: '47%',
    left: 5,
  },

  [`&.${classes.bottom}`]: {
    top: 'calc(100% - 5px)',
    left: '47%',
  },

  [`&.${classes.right}`]: {
    top: '47%',
    left: 'calc(100% - 5px)',
  },
}));

/* eslint-disable-next-line */
export interface ViewportOrientationMarkersProps {
  imageId: string;
  rotationDegrees: number;
  isFlippedVertically: boolean;
  isFlippedHorizontally: boolean;
  orientationMarkers: ('top' | 'left' | 'bottom' | 'right')[];
}

export function ViewportOrientationMarkers({
  imageId,
  rotationDegrees,
  isFlippedVertically,
  isFlippedHorizontally,
  orientationMarkers = ['top', 'left'],
}: ViewportOrientationMarkersProps) {
  const { rowCosines, columnCosines } = getCosinesFromCS(imageId);
  if (!rowCosines || !columnCosines) {
    return <></>;
  }

  const markers = getOrientationMarkers({
    rowCosines,
    columnCosines,
    rotationDegrees,
    isFlippedVertically,
    isFlippedHorizontally,
  });
  return (
    <>
      {orientationMarkers.map((marker) => (
        <MarkerElement key={marker} className={classes[marker]}>
          {markers[marker]}
        </MarkerElement>
      ))}
    </>
  );
}

export default ViewportOrientationMarkers;
