import { Enums as CSToolEnums } from '@cornerstonejs/tools';
import {MeasurementToolTypes} from "../../types";

export enum CornerstoneToolNames {
  // Basic
  Magnify = 'Magnify',
  Pan = 'Pan',
  TrackballRotate = 'TrackballRotate',
  DragProbe = 'DragProbe',
  Wwwc = 'WindowLevel',
  StackScroll = 'StackScroll',
  StackScrollMouseWheel = 'StackScrollMouseWheel',
  Zoom = 'Zoom',
  VolumeRotateMouseWheel = 'VolumeRotateMouseWheel',
  MIPJumpToClick = 'MIPJumpToClick',
  // Annotation s
  Crosshairs = 'Crosshairs',
  Bidirectional = 'Bidirectional',
  Length = 'Length',
  Probe = 'Probe',
  RectangleROI = 'RectangleROI',
  EllipticalROI = 'EllipticalROI',
  PlanarFreehandROI = 'PlanarFreehandROI',
  ArrowAnnotate = 'ArrowAnnotate',
  Angle = 'Angle',
  // Segmentation tools
  SegmentationDisplay = 'SegmentationDisplay',
  RectangleScissors = 'RectangleScissors',
  CircleScissors = 'CircleScissors',
  SphereScissors = 'SphereScissors',
  RectangleROIThreshold = 'RectangleROIThreshold',
  RectangleROIStartEndThreshold = 'RectangleROIStartEndThreshold',
  Brush = 'Brush',
}

export enum ElementTypes {
  Button,
  Divider,
  Select,
  Component,
}

export enum MouseButtonTypes {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
  NONE = 'none',
}

export const MouseBindingMappings: Record<
  MouseButtonTypes,
  CSToolEnums.MouseBindings
> = {
  [MouseButtonTypes.LEFT]: CSToolEnums.MouseBindings.Primary,
  [MouseButtonTypes.RIGHT]: CSToolEnums.MouseBindings.Secondary,
  [MouseButtonTypes.CENTER]: CSToolEnums.MouseBindings.Auxiliary,
  [MouseButtonTypes.NONE]: CSToolEnums.MouseBindings.Fifth_Button,
};

export const MeasurementTools: string[] = [
  CornerstoneToolNames.Angle,
  CornerstoneToolNames.ArrowAnnotate,
  CornerstoneToolNames.Bidirectional,
  CornerstoneToolNames.CircleScissors,
  CornerstoneToolNames.Length,
  CornerstoneToolNames.PlanarFreehandROI,
  CornerstoneToolNames.RectangleROI,
  CornerstoneToolNames.RectangleScissors,
  CornerstoneToolNames.Probe,
]

export enum MenuItems {
  SeriesList = 'SeriesList',
  PlayTools = 'PlayTools',
  AnnotationList = 'AnnotationList',
  SegmentationList = 'SegmentationList',
  MetadataList = 'Metadata',
  SegmentationDialog = 'SegmentationDialog',
}

export const AssignedToolKeys = {
  [CornerstoneToolNames.Wwwc]: 'w',
  [CornerstoneToolNames.Zoom]: 'z',
  [CornerstoneToolNames.Pan]: 'm',
  [CornerstoneToolNames.Length]: 'l',
  [CornerstoneToolNames.RectangleROI]: 'r',
  [CornerstoneToolNames.PlanarFreehandROI]: 'f',
  [CornerstoneToolNames.Brush]: 'b',
};

export const ToolDisplayNames = {
  [MenuItems.SeriesList]: 'Series List',
  [CornerstoneToolNames.Wwwc]: `Windowing (${AssignedToolKeys[
    CornerstoneToolNames.Wwwc
  ].toUpperCase()})`,
  [CornerstoneToolNames.StackScroll]: `Stack Scroll`,
  [CornerstoneToolNames.Zoom]: `Zoom (${AssignedToolKeys[
    CornerstoneToolNames.Zoom
  ].toUpperCase()})`,
  [CornerstoneToolNames.Pan]: `Pan (${AssignedToolKeys[
    CornerstoneToolNames.Pan
  ].toUpperCase()})`,
  [CornerstoneToolNames.Magnify]: `Magnify`,
  [CornerstoneToolNames.DragProbe]: `Probe`,
  [CornerstoneToolNames.VolumeRotateMouseWheel]: `Mouse Wheel Rotate`,
  [CornerstoneToolNames.MIPJumpToClick]: `MIP Jump`,
  [CornerstoneToolNames.Crosshairs]: `Crosshairs`,
  [CornerstoneToolNames.Bidirectional]: `Bidirectional`,
  [CornerstoneToolNames.TrackballRotate]: `Rotate`,
  [CornerstoneToolNames.EllipticalROI]: `Elliptical ROI`,
  [CornerstoneToolNames.RectangleROIThreshold]: `Rectangle ROI Threshold`,
  [CornerstoneToolNames.RectangleROIStartEndThreshold]: `Rectangle ROI Start End Threshold`,
  [CornerstoneToolNames.ArrowAnnotate]: `Arrow Label`,
  [CornerstoneToolNames.Angle]: `Angle`,
  [CornerstoneToolNames.RectangleScissors]: `Rectangle Scissors`,
  [CornerstoneToolNames.Length]: `Measure Length (${AssignedToolKeys[
    CornerstoneToolNames.Length
  ].toUpperCase()})`,
  [CornerstoneToolNames.RectangleROI]: `Rectangle ROI (${AssignedToolKeys[
    CornerstoneToolNames.RectangleROI
  ].toUpperCase()})`,
  [CornerstoneToolNames.PlanarFreehandROI]: `Freehand ROI (${AssignedToolKeys[
    CornerstoneToolNames.PlanarFreehandROI
  ].toUpperCase()})`,
  [CornerstoneToolNames.Brush]: `Brush Seg. (${AssignedToolKeys[
    CornerstoneToolNames.Brush
  ].toUpperCase()})`,
  [MenuItems.PlayTools]: 'Toggle Play Tools',
  [MenuItems.SegmentationList]: 'Segmentation',
  [MenuItems.AnnotationList]: 'Annotations List',
  [MenuItems.MetadataList]: 'Metadata',
};
