import { metaData } from '@cornerstonejs/core';
import {
  formatNumberPrecision,
} from '@zhiva/utils-cornerstone';
import {WADO_IMAGE_LOADER_TAGS} from "@zhiva/shared/constants";

export function getCompression(imageId: string) {
  const {
    lossyImageCompression,
    lossyImageCompressionRatio,
    lossyImageCompressionMethod,
  } = metaData.get(WADO_IMAGE_LOADER_TAGS.GENERAL_IMAGE_MODULE, imageId) || {};

  if (lossyImageCompression === '01' && lossyImageCompressionRatio !== '') {
    const compressionMethod = lossyImageCompressionMethod || 'Lossy: ';
    const compressionRatio = formatNumberPrecision(
      lossyImageCompressionRatio,
      2
    );
    return compressionMethod + compressionRatio + ' : 1';
  }

  return 'Lossless / Uncompressed';
}
