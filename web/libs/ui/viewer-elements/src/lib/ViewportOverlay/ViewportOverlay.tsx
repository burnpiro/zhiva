import { styled } from '@mui/material/styles';
import { metaData } from '@cornerstonejs/core';
import { formatDA, formatPN, formatTM } from '@zhiva/utils-cornerstone';
import { getCompression } from './helpers/getCompression';
import { WADO_IMAGE_LOADER_TAGS } from '@zhiva/shared/constants';

const PREFIX = 'ViewportOverlay';

const classes = {
  topLeft: `${PREFIX}-topLeft`,
  topRight: `${PREFIX}-topRight`,
  bottomLeft: `${PREFIX}-bottomLeft`,
  bottomRight: `${PREFIX}-bottomRight`,
};

const VPElement = styled('div')(({ theme }) => ({
  position: 'absolute',
  fontWeight: 400,
  textShadow: '1px 1px #000',
  pointerEvents: 'none',

  [`&.${classes.topLeft}`]: {
    top: 20,
    left: 20,
  },

  [`&.${classes.topRight}`]: {
    top: 20,
    right: 20,
    textAlign: 'right',
  },

  [`&.${classes.bottomLeft}`]: {
    bottom: 20,
    left: 20,
  },

  [`&.${classes.bottomRight}`]: {
    bottom: 20,
    right: 20,
    textAlign: 'right',
  },
}));

export interface ViewportOverlayProps {
  scale?: number;
  windowWidth: number;
  windowCenter: number;
  imageIdIndex: number;
  stackSize: number;
  imageId: string;
  frameRate: number;
}

export function ViewportOverlay({
  scale = 1,
  windowWidth,
  windowCenter,
  imageIdIndex,
  imageId,
  stackSize,
  frameRate,
}: ViewportOverlayProps) {
  const wwwc = `W: ${windowWidth.toFixed(0)} L: ${windowCenter.toFixed(0)}`;
  const zoomPercentage = Number(scale * 100).toFixed(0);
  const compression = getCompression(imageId);

  const { patientId, patientName } =
    metaData.get(WADO_IMAGE_LOADER_TAGS.PATIENT_MODULE, imageId) || {};

  const { studyDate, studyTime, studyDescription } =
    metaData.get(WADO_IMAGE_LOADER_TAGS.GENERAL_STUDY_MODULE, imageId) || {};

  const { seriesNumber, seriesDescription } =
    metaData.get(WADO_IMAGE_LOADER_TAGS.GENERAL_SERIES_MODULE, imageId) || {};

  const { rows, columns, sliceThickness, sliceLocation } =
    metaData.get(WADO_IMAGE_LOADER_TAGS.IMAGE_PLANE_MODULE, imageId) || {};

  return (
    <>
      <VPElement className={classes.topLeft}>
        <div>{formatPN(patientName)}</div>
        <div>{patientId}</div>
      </VPElement>
      <VPElement className={classes.topRight}>
        <div>{studyDescription}</div>
        <div>
          {formatDA(studyDate)} {formatTM(studyTime)}
        </div>
      </VPElement>
      <VPElement className={classes.bottomLeft}>
        <div>Zoom: {zoomPercentage}%</div>
        <div>{wwwc}</div>
        <div className="compressionIndicator">{compression}</div>
      </VPElement>
      <VPElement className={classes.bottomRight}>
        <div>{seriesNumber >= 0 ? `Ser: ${seriesNumber}` : ''}</div>
        <div>
          {stackSize > 1 ? `Img: ${imageIdIndex + 1}/${stackSize}` : ''}
        </div>
        <div>
          {frameRate > 0 ? `${frameRate} FPS` : ''}
          <div>{`${columns} x ${rows}`}</div>
          <div>
            {typeof sliceLocation === 'number' && !Number.isNaN(sliceLocation)
              ? `Loc: ${sliceLocation.toFixed(2)} mm `
              : ''}
            {typeof sliceThickness === 'number' && !Number.isNaN
              ? `Thick: ${sliceThickness.toFixed(2)} mm`
              : ''}
          </div>
          <div>{seriesDescription}</div>
        </div>
      </VPElement>
    </>
  );
}

export default ViewportOverlay;
