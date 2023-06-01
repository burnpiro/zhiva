import * as cornerstoneTools from '@cornerstonejs/tools';
import { volumeLoader, cache, ImageVolume } from '@cornerstonejs/core';
import { Enums as CSToolsEnums } from '@cornerstonejs/tools';
import { BrushColorClass, DEFAULT_SEG_LABEL } from '@zhiva/utils';

const {
  ToolGroupManager,
  Enums: csToolsEnums,
  segmentation,
} = cornerstoneTools;

interface SegmentationProps {
  id: string;
  type?: CSToolsEnums.SegmentationRepresentations;
  label?: string;
}

class Segmentation {
  readonly id: string;
  public type: CSToolsEnums.SegmentationRepresentations;
  public assignedVolume?: string;
  public activeSegmentIndex: number;
  public segmentationRepresentationUID?: string;
  public label: string;
  public colorLUTIndex: number;

  constructor({ id, type, label }: SegmentationProps) {
    this.id = id;
    this.type = type || csToolsEnums.SegmentationRepresentations.Labelmap;
    this.activeSegmentIndex = 0;
    this.colorLUTIndex = 0;
    this.label = label || DEFAULT_SEG_LABEL;
  }

  public async initializeSegmentationFromVolume(
    volumeId: string,
    replaceIfExists: boolean = false
  ): Promise<ImageVolume> {
    this.assignVolumeIdToSegmentation(volumeId);
    const existingVolume = cache.getVolume(this.id) as ImageVolume;

    if (existingVolume && !replaceIfExists) {
      return existingVolume;
    }

    if (existingVolume && replaceIfExists) {
      cache.removeVolumeLoadObject(this.id);
    }

    return volumeLoader.createAndCacheDerivedVolume(volumeId, {
      volumeId: this.id,
    });
  }

  public assignVolumeIdToSegmentation(volumeId: string): void {
    this.assignedVolume = volumeId;
  }

  public setBrushClass(brushClass: BrushColorClass) {
    this.colorLUTIndex = brushClass.activeLabelmapIndex;
  }
}

export { Segmentation, SegmentationProps };
