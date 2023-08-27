import { metaData } from '@cornerstonejs/core';
import { WADO_IMAGE_LOADER_TAGS } from '@zhiva/utils';

export function getCosinesFromCS(imageId: string) {
  const { rowCosines, columnCosines } =
    metaData.get(WADO_IMAGE_LOADER_TAGS.IMAGE_PLANE_MODULE, imageId) || {};

  return {
    rowCosines,
    columnCosines,
  };
}
