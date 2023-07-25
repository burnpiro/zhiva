import * as dicomParser from 'dicom-parser';
import * as cornerstone from '@cornerstonejs/core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

export default function initCornerstoneWADOImageLoader() {
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.configure({
    useWebWorkers: true,
    decodeConfig: {
      convertFloatPixelDataToInt: false,
    },
  });

  const maxWebWorkers = navigator.hardwareConcurrency
    ? Math.min(navigator.hardwareConcurrency, 7)
    : 1;

  const config = {
    maxWebWorkers,
    startWebWorkersOnDemand: false,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        strict: false,
      },
    },
  };

  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
}
