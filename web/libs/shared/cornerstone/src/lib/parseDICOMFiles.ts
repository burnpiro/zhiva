
import { RenderingEngine, Types, Enums, metaData } from '@cornerstonejs/core';
import { loadImage } from '@cornerstonejs/core/dist/esm/imageLoader';
import {
  metadataProvider,
  WADO_IMAGE_LOADER_TAGS,
} from '@zhiva/utils-cornerstone';
// @ts-ignore
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

async function parseDICOMFiles(files: File[]) {
  try {
    const imageIds: string[] = []
    for (const file of files) {
      const imageId =
        cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      imageIds.push(imageId);
    }



  } catch (e) {
    console.error(e);
  }
}
