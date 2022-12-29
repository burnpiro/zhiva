import { CornerstoneToolNames } from '@zhiva/shared/constants';

export type ToolTypes = CornerstoneToolNames;

export type MeasurementTools =
  | CornerstoneToolNames.CircleRoi
  | CornerstoneToolNames.EllipticalRoi
  | CornerstoneToolNames.FreehandRoi
  | CornerstoneToolNames.FreehandRoiSculptor
  | CornerstoneToolNames.RectangleRoi
  | CornerstoneToolNames.Brush
  | CornerstoneToolNames.SphericalBrush
  | CornerstoneToolNames.EfficientBrush;

export type MouseButtonTypes = 'left' | 'right' | 'center' | 'none';

export interface DicomMenu {
  showSeriesList: boolean;
  showAnnotations: boolean;
  showSegmentation: boolean;
  showMetadata: boolean;
  selectedMouseSide: MouseButtonTypes;
  isPlaying: boolean;
  cineFrameRate: number;
  imageIdIndex: number;
  activeTool: ToolTypes;
  mouseOptions: {
    left: ToolTypes | null;
    right: ToolTypes | null;
    center: ToolTypes | null;
  };
}

export interface ViewerTool {
  name: ToolTypes;
  mode?: 'active' | 'passive' | 'enabled' | 'disabled';
  type?: 'mouse' | 'touch' | 'static';
  props?: any;
  toolClass?: any; // Instance of CornerstoneTool Base Tools
  defaultMode?: 'active' | 'passive' | 'enabled' | 'disabled';
  modeOptions?: {
    mouseButtonMask: number | undefined;
  };
}

export interface ViewerOptions {
  isPlaying: boolean;
  cineFrameRate: number;
  imageIdIndex: number;
  activeTool: ToolTypes;
  tools: ViewerTool[];
}

export type WindowingDef = {
  width: string;
  level: string;
  name: string;
  key: any;
  keyCode: string;
};
