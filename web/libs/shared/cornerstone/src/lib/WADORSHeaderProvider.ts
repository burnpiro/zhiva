import dcmjs from 'dcmjs';
import { utilities as csUtils } from '@cornerstonejs/core';
import { InstanceMetadata } from '@zhiva/utils';
const metadataHeadersPerImageId: Record<string, any> = {};
const INSTANCE = 'instance';

const { DicomMessage, DicomMetaDictionary } = dcmjs.data;

function addInstance(
  imageId: string,
  dicomJSONDatasetOrP10ArrayBuffer: ArrayBuffer | InstanceMetadata
) {
  let dicomJSONDataset;

  // If Arraybuffer, parse to DICOMJSON before naturalizing.
  if (dicomJSONDatasetOrP10ArrayBuffer instanceof ArrayBuffer) {
    const dicomData = DicomMessage.readFile(dicomJSONDatasetOrP10ArrayBuffer);

    dicomJSONDataset = dicomData.dict;
  } else {
    dicomJSONDataset = dicomJSONDatasetOrP10ArrayBuffer;
  }

  // Check if dataset is already naturalized.
  let naturalizedDataset;

  if (dicomJSONDataset['SeriesInstanceUID'] === undefined) {
    naturalizedDataset =
      DicomMetaDictionary.naturalizeDataset(dicomJSONDataset);
  } else {
    naturalizedDataset = dicomJSONDataset;
  }

  const imageURI = csUtils.imageIdToURI(imageId);
  metadataHeadersPerImageId[imageURI] = naturalizedDataset;
}

function get(query: string, imageId: string) {
  const imageURI = csUtils.imageIdToURI(imageId);

  if (query === INSTANCE) {
    return metadataHeadersPerImageId[imageURI];
  }
}

export const WADORSHeaderProvider = {
  get,
  addInstance,
};
