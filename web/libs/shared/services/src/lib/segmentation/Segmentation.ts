import * as cornerstoneTools from '@cornerstonejs/tools';
import {volumeLoader, cache, ImageVolume} from '@cornerstonejs/core';
import {SegmentationRepresentations} from "@cornerstonejs/tools/dist/esm/enums";

const {
  ToolGroupManager,
  Enums: csToolsEnums,
  segmentation,
} = cornerstoneTools;

interface SegmentationProps {
  id: string;
  type?: SegmentationRepresentations;
}

class Segmentation {
  readonly id: string;
  public type: SegmentationRepresentations;

  constructor({ id, type }: SegmentationProps) {
    this.id = id;
    this.type = type || csToolsEnums.SegmentationRepresentations.Labelmap;
  }

  public async initializeSegmentationFromVolume(volumeId: string): Promise<ImageVolume> {
    const existingVolume = cache.getVolume(this.id);

    if (existingVolume) {
      return existingVolume;
    }

    return volumeLoader.createAndCacheDerivedVolume(volumeId, {
      volumeId: this.id,
    });
  }
}

export { Segmentation, SegmentationProps };
