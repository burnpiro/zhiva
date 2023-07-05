import { DicomMenuItem } from '@zhiva/utils';
import {
  CornerstoneToolNames,
  ElementTypes,
  MenuItems,
  MouseButtonTypes,
  ToolDisplayNames,
} from '@zhiva/utils';
import HighlightAlt from '@mui/icons-material/HighlightAlt';
import { FrameRateControl, ToolIcons } from '@zhiva/viewer-elements';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import ListIcon from '@mui/icons-material/RecentActorsOutlined';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import FormatShapesOutlinedIcon from '@mui/icons-material/FormatShapesOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import React from 'react';
import {
  ANNOTATION_ITEM_TOOL_KEY,
  DRAWERS_ITEM_TOOL_KEY,
  MOUSE_ITEM_TOOL_KEY,
} from '@zhiva/react-contexts';
import MouseClickedIcon
  from "../../../../../libs/shared/contexts/src/lib/MenuContext/MouseClickedIcon/MouseClickedIcon";

export const DefaultMenuElements: DicomMenuItem[] = [
  {
    type: ElementTypes.Button,
    name: 'Selected Mouse Button',
    toolKey: MOUSE_ITEM_TOOL_KEY,
    customIcon: <MouseClickedIcon side={MouseButtonTypes.LEFT} />,
    args: {
      fontSize: 'large',
    },
  },
  {
    toolKey: 'divide-mouse',
    type: ElementTypes.Divider,
  },
  {
    type: ElementTypes.Button,
    toolKey: CornerstoneToolNames.Wwwc,
    name: ToolDisplayNames[CornerstoneToolNames.Wwwc],
  },
  {
    type: ElementTypes.Button,
    toolKey: CornerstoneToolNames.StackScroll,
    name: ToolDisplayNames[CornerstoneToolNames.StackScroll],
  },
  {
    type: ElementTypes.Button,
    toolKey: CornerstoneToolNames.Zoom,
    name: ToolDisplayNames[CornerstoneToolNames.Zoom],
  },
  {
    type: ElementTypes.Button,
    toolKey: CornerstoneToolNames.Pan,
    name: ToolDisplayNames[CornerstoneToolNames.Pan],
  },
  {
    type: ElementTypes.Button,
    toolKey: CornerstoneToolNames.Length,
    name: ToolDisplayNames[CornerstoneToolNames.Length],
    desktopOnly: true,
  },
  {
    type: ElementTypes.Select,
    name: 'Annotations',
    toolKey: ANNOTATION_ITEM_TOOL_KEY,
    args: {
      mainIcon: <HighlightAlt />,
      replaceWithSelectedIcon: true,
      items: [
        {
          itemKey: CornerstoneToolNames.RectangleROI,
          name: ToolDisplayNames[CornerstoneToolNames.RectangleROI],
          IconClass: ToolIcons[CornerstoneToolNames.RectangleROI],
        },
        {
          itemKey: CornerstoneToolNames.PlanarFreehandROI,
          name: ToolDisplayNames[CornerstoneToolNames.PlanarFreehandROI],
          IconClass: ToolIcons[CornerstoneToolNames.PlanarFreehandROI],
        },
        {
          itemKey: CornerstoneToolNames.ArrowAnnotate,
          name: ToolDisplayNames[CornerstoneToolNames.ArrowAnnotate],
          IconClass: ToolIcons[CornerstoneToolNames.ArrowAnnotate],
        },
        {
          itemKey: CornerstoneToolNames.Brush,
          name: ToolDisplayNames[CornerstoneToolNames.Brush],
          IconClass: ToolIcons[CornerstoneToolNames.Brush],
        },
      ],
    },
  },
  {
    type: ElementTypes.Component,
    toolKey: 'frameRateSelect',
    customComponent: (
      <FrameRateControl
        isPlaying={false}
        frameRate={5}
        onFrameRateChange={() => {}}
        onIsPlayingChange={() => {}}
        onResetFrames={() => {}}
      />
    ),
  },
  {
    type: ElementTypes.Select,
    name: 'Panels',
    toolKey: DRAWERS_ITEM_TOOL_KEY,
    placement: 'right',
    args: {
      mainIcon: <VerticalSplitIcon />,
      items: [
        {
          itemKey: MenuItems.SeriesList,
          name: ToolDisplayNames[MenuItems.SeriesList],
          icon: <ListIcon />,
        },
        {
          itemKey: MenuItems.SegmentationList,
          name: ToolDisplayNames[MenuItems.SegmentationList],
          icon: <ScatterPlotIcon />,
        },
        {
          itemKey: MenuItems.AnnotationList,
          name: ToolDisplayNames[MenuItems.AnnotationList],
          icon: <FormatShapesOutlinedIcon />,
        },
        {
          itemKey: MenuItems.MetadataList,
          name: ToolDisplayNames[MenuItems.MetadataList],
          icon: <StickyNote2OutlinedIcon />,
        },
      ],
    },
  },
];
