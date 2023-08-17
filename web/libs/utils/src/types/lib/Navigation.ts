import {
  CornerstoneToolNames, ElementTypes,
  MouseButtonTypes,
} from '@zhiva/utils';
import { BaseTool, Types as CSToolTypes, Enums as CSToolEnums } from '@cornerstonejs/tools';

export type ToolTypes = CornerstoneToolNames;

export type MeasurementToolTypes =
  | CornerstoneToolNames.CircleScissors
  | CornerstoneToolNames.SphereScissors
  | CornerstoneToolNames.PlanarFreehandROI
  | CornerstoneToolNames.RectangleROI
  | CornerstoneToolNames.ArrowAnnotate
  | CornerstoneToolNames.RectangleScissors
  | CornerstoneToolNames.Length;

export type CSTool = {
  name: CornerstoneToolNames | string;
  toolClass?: typeof BaseTool;
  toolConfiguration?: any;
  mode: CSToolEnums.ToolModes;
  defaultMode?: CSToolEnums.ToolModes;
  bindings?: CSToolTypes.IToolBinding;
};

export type DicomMenuItem = {
  name?: string;
  type: ElementTypes;
  customIcon?: React.ReactElement;
  customComponent?: React.ReactElement;
  args?: Record<string, any>;
  toolKey: CornerstoneToolNames | string;
  placement?: 'left' | 'right';
  desktopOnly?: boolean;
  touchOnly?: boolean;
}

export interface DicomMenu {
  drawers: {
    name: string;
    isShown: boolean;
  }[];
  dialogs: {
    name: string;
    isShown: boolean;
  }[];
  selectedMouseSide: MouseButtonTypes;
  isPlaying: boolean;
  cineFrameRate: number;
  imageIdIndex: number;
  activeMenuItems: string[];
  disabledMenuItems: string[];
  tools: CSTool[];
  menuItems: DicomMenuItem[];
}

export type WindowingDef = {
  width: string;
  level: string;
  name: string;
  key: any;
  keyCode: string;
};
