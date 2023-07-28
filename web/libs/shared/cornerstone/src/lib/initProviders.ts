import * as cornerstone from '@cornerstonejs/core';
import {WADORSHeaderProvider} from './WADORSHeaderProvider';
import {ptScalingMetaDataProvider} from './ptScalingMetaDataProvider';
import metadataProvider from './MetadataProvider';
import { wadoRsMetaDataProvider } from './wadoRsMetaDataProvider';
import { wadoUriMetaDataProvider } from './wadoUriMetaDataProvider';

const { calibratedPixelSpacingMetadataProvider } = cornerstone.utilities;

export default function initProviders() {
  // cornerstone.metaData.addProvider(wadoRsMetaDataProvider, 1);
  // @ts-ignore
  cornerstone.metaData.addProvider(wadoUriMetaDataProvider, 10000);
  cornerstone.metaData.addProvider(
    WADORSHeaderProvider.get.bind(WADORSHeaderProvider),
    9999
  );
  cornerstone.metaData.addProvider(
    ptScalingMetaDataProvider.get.bind(ptScalingMetaDataProvider),
    10000
  );
  cornerstone.metaData.addProvider(
    // @ts-ignore
    calibratedPixelSpacingMetadataProvider.get.bind(
      calibratedPixelSpacingMetadataProvider
    ),
    11000
  );
  // cornerstone.metaData.addProvider(
  //   metadataProvider.get.bind(
  //     metadataProvider
  //   ),
  //   11001
  // );
}
