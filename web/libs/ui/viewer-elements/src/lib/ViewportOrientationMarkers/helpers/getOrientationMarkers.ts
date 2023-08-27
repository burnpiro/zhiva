import {utilities} from '@cornerstonejs/tools';
import {Types} from '@cornerstonejs/core';

const {orientation: {getOrientationStringLPS, invertOrientationStringLPS}} = utilities;

interface GetOrientationMarkers {
  rowCosines: Types.Point3,
  columnCosines: Types.Point3,
  rotationDegrees: number,
  isFlippedVertically: boolean,
  isFlippedHorizontally: boolean,
}

export function getOrientationMarkers({
  rotationDegrees, columnCosines, isFlippedHorizontally, isFlippedVertically, rowCosines
                                      }: GetOrientationMarkers) {
  const rowString = getOrientationStringLPS(rowCosines);
  const columnString = getOrientationStringLPS(columnCosines);
  const oppositeRowString = invertOrientationStringLPS(rowString);
  const oppositeColumnString = invertOrientationStringLPS(columnString);


  const markers = {
    top: oppositeColumnString,
    left: oppositeRowString,
    right: rowString,
    bottom: columnString,
  };


  if (isFlippedVertically) {
    markers.top = invertOrientationStringLPS(markers.top);
    markers.bottom = invertOrientationStringLPS(markers.bottom);
  }

  if (isFlippedHorizontally) {
    markers.left = invertOrientationStringLPS(markers.left);
    markers.right = invertOrientationStringLPS(markers.right);
  }

  if (rotationDegrees === 90 || rotationDegrees === -270) {
    return {
      top: markers.left,
      left: invertOrientationStringLPS(markers.top),
      right: invertOrientationStringLPS(markers.bottom),
      bottom: markers.right, // left
    };
  } else if (rotationDegrees === -90 || rotationDegrees === 270) {
    return {
      top: invertOrientationStringLPS(markers.left),
      left: markers.top,
      bottom: markers.left,
      right: markers.bottom,
    };
  } else if (rotationDegrees === 180 || rotationDegrees === -180) {
    return {
      top: invertOrientationStringLPS(markers.top),
      left: invertOrientationStringLPS(markers.left),
      bottom: invertOrientationStringLPS(markers.bottom),
      right: invertOrientationStringLPS(markers.right),
    };
  }

  return markers;
}
