import { api } from 'dicomweb-client';
import * as dcmjs from 'dcmjs';
import { utilities } from '@cornerstonejs/core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { calculateSUVScalingFactors } from '@cornerstonejs/calculate-suv';
import { InstanceUIDs } from '@zhiva/types';
import {
  WADORSHeaderProvider,
  getPixelSpacingInformation,
  getPTImageIdInstanceMetadata,
  ptScalingMetaDataProvider
} from '@zhiva/utils-cornerstone';
import {InstanceMetadata} from "@cornerstonejs/calculate-suv/src/types";

export enum VIEWPORT_TYPES {
  VOLUME = 'VOLUME',
  STACK = 'STACK'
}
const { DicomMetaDictionary } = dcmjs.data;


export type LoadInstancesFromURIProps = {
  StudyInstanceUID: InstanceUIDs['StudyInstanceUID'];
  SeriesInstanceUID: InstanceUIDs['SeriesInstanceUID'];
  wadoRsRoot: string;
  type: VIEWPORT_TYPES;
};

export async function loadInstancesFromURI({
  StudyInstanceUID,
  SeriesInstanceUID,
  wadoRsRoot,
  type,
}: LoadInstancesFromURIProps) {
  const SOP_INSTANCE_UID = '00080018';
  const SERIES_INSTANCE_UID = '0020000E';
  const MODALITY = '00080060';

  const studySearchOptions = {
    studyInstanceUID: StudyInstanceUID,
    seriesInstanceUID: SeriesInstanceUID,
  };

  const client = new api.DICOMwebClient({ url: wadoRsRoot });
  const instances = await client.retrieveSeriesMetadata(studySearchOptions);
  const modality = instances[0][MODALITY].Value[0];

  const imageIds = instances.map((instanceMetaData: any) => {
    const SeriesInstanceUID = instanceMetaData[SERIES_INSTANCE_UID].Value[0];
    const SOPInstanceUID = instanceMetaData[SOP_INSTANCE_UID].Value[0];

    const prefix =
      type === VIEWPORT_TYPES.VOLUME ? 'streaming-wadors:' : 'wadors:';

    const imageId =
      prefix +
      wadoRsRoot +
      '/studies/' +
      StudyInstanceUID +
      '/series/' +
      SeriesInstanceUID +
      '/instances/' +
      SOPInstanceUID +
      '/frames/1';

    cornerstoneWADOImageLoader.wadors.metaDataManager.add(
      imageId,
      instanceMetaData
    );

    WADORSHeaderProvider.addInstance(imageId, instanceMetaData);

    // Add calibrated pixel spacing
    const m = JSON.parse(JSON.stringify(instanceMetaData));
    const instance = DicomMetaDictionary.naturalizeDataset(m);
    console.log(instance);
    const pixelSpacing = getPixelSpacingInformation(instance);
    console.log(pixelSpacing);

    utilities.calibratedPixelSpacingMetadataProvider.add(
      imageId,
      pixelSpacing.PixelSpacing.map((s: string) => parseFloat(s))
    );

    return imageId;
  });

  // we don't want to add non-pet
  // Note: for 99% of scanners SUV calculation is consistent bw slices
  if (modality === 'PT') {
    const InstanceMetadataArray: InstanceMetadata[] = [];
    imageIds.forEach((imageId: string) => {
      const instanceMetadata = getPTImageIdInstanceMetadata(imageId);

      // TODO: Temporary fix because static-wado is producing a string, not an array of values
      // (or maybe dcmjs isn't parsing it correctly?)
      // It's showing up like 'DECY\\ATTN\\SCAT\\DTIM\\RAN\\RADL\\DCAL\\SLSENS\\NORM'
      // but calculate-suv expects ['DECY', 'ATTN', ...]
      // if (typeof instanceMetadata.CorrectedImage === 'string') {
      //   instanceMetadata.CorrectedImage =
      //     instanceMetadata.CorrectedImage.split('\\');
      // }

      if (instanceMetadata) {
        InstanceMetadataArray.push(instanceMetadata);
      }
    });
    if (InstanceMetadataArray.length) {
      const suvScalingFactors = calculateSUVScalingFactors(
        InstanceMetadataArray
      );
      InstanceMetadataArray.forEach((instanceMetadata, index) => {
        ptScalingMetaDataProvider.addInstance(
          imageIds[index],
          suvScalingFactors[index]
        );
      });
    }
  }

  return imageIds;
}
