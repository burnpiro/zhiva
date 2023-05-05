import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

import { MenuActions, MenuActionTypes, menuReducer } from './MenuReducer';
import { DicomMenu, DicomMenuItem } from '@zhiva/types';
import {
  CornerstoneToolNames,
  ElementTypes,
  MenuItems,
  MouseBindingMappings,
  MouseButtonTypes,
  ToolDisplayNames,
} from '@zhiva/shared/constants';
import { MouseBindings, ToolModes } from '@cornerstonejs/tools/dist/esm/enums';
import { FrameRateControl, ToolIcons } from '@zhiva/viewer-elements';
import { MouseClickedIcon } from '@zhiva/ui-components';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import FormatShapesOutlinedIcon from '@mui/icons-material/FormatShapesOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import HighlightAlt from '@mui/icons-material/HighlightAlt';
import ListIcon from '@mui/icons-material/RecentActorsOutlined';

export const MOUSE_ITEM_TOOL_KEY = 'mouse';
export const DRAWERS_ITEM_TOOL_KEY = 'drawers';
export const ANNOTATION_ITEM_TOOL_KEY = 'annotations';

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
      mainIcon: <DashboardCustomizeOutlinedIcon />,
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

const initialState: DicomMenu = {
  drawers: [
    {
      name: MenuItems.SeriesList,
      isShown: true,
    },
    {
      name: MenuItems.SegmentationList,
      isShown: false,
    },
    {
      name: MenuItems.AnnotationList,
      isShown: false,
    },
    {
      name: MenuItems.MetadataList,
      isShown: false,
    },
  ],
  selectedMouseSide: MouseButtonTypes.LEFT,
  isPlaying: false,
  cineFrameRate: 25,
  imageIdIndex: 0,
  activeMenuItems: [DRAWERS_ITEM_TOOL_KEY, MOUSE_ITEM_TOOL_KEY],
  disabledMenuItems: [],
  tools: [
    {
      name: CornerstoneToolNames.Wwwc,
      mode: ToolModes.Active,
      bindings: { mouseButton: MouseBindings.Primary },
    },
    {
      name: CornerstoneToolNames.StackScroll,
      mode: ToolModes.Disabled,
    },
    {
      name: CornerstoneToolNames.Pan,
      mode: ToolModes.Active,
      bindings: { mouseButton: MouseBindings.Auxiliary },
    },
    {
      name: CornerstoneToolNames.Zoom,
      mode: ToolModes.Active,
      bindings: { mouseButton: MouseBindings.Secondary },
    },
    {
      name: CornerstoneToolNames.RectangleROI,
      defaultMode: ToolModes.Enabled,
      mode: ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.PlanarFreehandROI,
      defaultMode: ToolModes.Enabled,
      mode: ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.SegmentationDisplay,
      defaultMode: ToolModes.Enabled,
      mode: ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.Brush,
      defaultMode: ToolModes.Enabled,
      mode: ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.StackScrollMouseWheel,
      mode: ToolModes.Active,
    },
  ],
  menuItems: DefaultMenuElements,
};

const MenuContext = createContext<{
  menu: DicomMenu;
  dispatch: Dispatch<MenuActions>;
  selectTool: (toolKey: DicomMenuItem['toolKey']) => void;
  selectOption: (menuKey: string, elementKey: string) => void;
}>({
  menu: initialState,
  dispatch: () => null,
  selectTool: () => null,
  selectOption: () => null,
});

const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menu, dispatch] = useReducer(menuReducer, initialState);

  const selectTool = (toolKey: DicomMenuItem['toolKey']) => {
    if (toolKey === MOUSE_ITEM_TOOL_KEY) {
      dispatch({
        type: MenuActionTypes.SET_MOUSE_SIDE,
        payload: {
          selectedMouseSide:
            menu.selectedMouseSide === MouseButtonTypes.LEFT
              ? MouseButtonTypes.RIGHT
              : MouseButtonTypes.LEFT,
        },
      });
    } else {
      dispatch({
        type: MenuActionTypes.SET_TOOL_STATE,
        payload: {
          tool: toolKey,
          mode: ToolModes.Active,
          mouseBinding: MouseBindingMappings[menu.selectedMouseSide],
        },
      });
    }
  };

  const selectOption = (menuKey: string, elementKey: string) => {
    if (menuKey === DRAWERS_ITEM_TOOL_KEY) {
      dispatch({
        type: MenuActionTypes.SET_SHOW_DRAWER,
        payload: {
          drawer: elementKey,
          isShown: !Boolean(
            menu.drawers.find((el) => el.name === elementKey)?.isShown
          ),
        },
      });
    } else {
      dispatch({
        type: MenuActionTypes.SET_TOOL_STATE,
        payload: {
          tool: elementKey,
          mode: ToolModes.Active,
          mouseBinding: MouseBindingMappings[menu.selectedMouseSide],
        },
      });
    }
  };

  return (
    <MenuContext.Provider value={{ menu, dispatch, selectTool, selectOption }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuProvider, MenuContext };
