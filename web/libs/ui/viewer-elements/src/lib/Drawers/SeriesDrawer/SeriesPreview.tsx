import React, { FC, useEffect, useRef, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { utilities, imageLoader } from '@cornerstonejs/core';
import { InstanceElement } from '@zhiva/utils';

interface SeriesPreviewProps {
  instance: InstanceElement;
  onClick: () => void;
  isSelected: boolean;
  showProgress?: boolean;
  numberOfInstances: number;
}

const PerformanceProgress = styled(LinearProgress)(({ theme }) => ({
  [`& .${linearProgressClasses.bar}`]: {
    transition: 'none',
  },
}));

const imageWidth = 210;
const imageHeight = 150;
const prevProg: Record<string, number> = {};

const SeriesPreview: FC<SeriesPreviewProps> = ({
  instance,
  onClick,
  isSelected,
  numberOfInstances,
  showProgress = false,
}) => {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (instance.imageId && canvasRef.current) {
        utilities.loadImageToCanvas({ canvas: canvasRef.current, imageId: instance.imageId});
        setLoading(false);
      }
    };

    loadImage();
  }, [instance.imageId, canvasRef.current]);

  return (
    <Box
      style={{
        cursor: onClick != null ? 'pointer' : 'default',
        position: 'relative',
      }}
      sx={{ width: '100%', padding: 2, marginRight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid grey' }}
      onClick={onClick}
    >
      {isSelected && (
        <VisibilityOutlinedIcon
          sx={{ position: 'absolute', top: 18, left: 18 }}
          color={'primary'}
        />
      )}
      {instance.SOPInstanceUID && instance.SOPInstanceUID !== '' ? (
        <React.Fragment>
          {/*{loading && (*/}
          {/*  <Skeleton*/}
          {/*    variant={'rectangular'}*/}
          {/*    width={imageWidth}*/}
          {/*    height={imageHeight}*/}
          {/*  />*/}
          {/*)}*/}
          {<canvas ref={canvasRef} width={imageWidth} height={imageHeight} />}
          <Box sx={{ pt: 0.5 }}>
            {showProgress && (
              <PerformanceProgress
                variant="determinate"
                value={prevProg[instance.SeriesInstanceUID]}
                sx={{ mt: -1, width: imageWidth }}
              />
            )}
            {instance.SeriesDescription ? (
              <Box
                sx={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography noWrap={true}>
                  {instance.SeriesDescription}
                </Typography>
              </Box>
            ) : (
              <Skeleton width="40%" />
            )}
            <Box
              sx={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ width: '20%' }}>
                {instance.SeriesNumber ? (
                  <Tooltip title="Series Number">
                    <Typography variant={'body2'} noWrap={true}>
                      S: {instance.SeriesNumber}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Skeleton variant={'circular'} />
                )}
              </Box>
              <Box sx={{ width: '20%' }}>
                {instance.InstanceNumber ? (
                  <Tooltip title="Instance Number">
                    <Typography variant={'body2'} noWrap={true}>
                      I: {instance.InstanceNumber}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Skeleton variant={'circular'} />
                )}
              </Box>
              <Box sx={{ width: '25%' }}>
                <Tooltip title="Images in Series">
                  <Typography variant={'body2'} noWrap={true}>
                    <AutoAwesomeMotionIcon fontSize={'small'} />{' '}
                    {numberOfInstances}
                  </Typography>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Skeleton
            variant={'rectangular'}
            width={imageWidth}
            height={imageHeight}
          />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton width="40%" />
            <Box
              sx={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ width: '10%' }}>
                <Skeleton variant={'circular'} />
              </Box>
              <Box sx={{ width: '10%' }}>
                <Skeleton variant={'circular'} />
              </Box>
              <Box sx={{ width: '10%' }}>
                <Skeleton variant={'circular'} />
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default SeriesPreview;
