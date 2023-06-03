import * as cornerstoneTools from '@cornerstonejs/tools';
import { volumeLoader, cache, ImageVolume } from '@cornerstonejs/core';
import { Enums as CSToolsEnums } from '@cornerstonejs/tools';
import { BrushColorClass, DEFAULT_SEG_LABEL } from '@zhiva/utils';

const { ToolGroupManager, Enums: csToolsEnums, annotation } = cornerstoneTools;

interface AnnotationProps {
  id: string;
  label?: string;
}

class Annotation {
  readonly annotationUID: string;
  public highlighted?: boolean;
  isLocked?: boolean;
  isVisible?: boolean;
  label?: string;
  FrameOfReferenceUID?: string;
  toolName?: string;

  constructor({ id, label }: AnnotationProps) {
    this.annotationUID = id;
    this.label = label;
  }
}
