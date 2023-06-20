import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

import { MenuActions, MenuActionTypes, menuReducer } from './MenuReducer';
import { DicomMenu, DicomMenuItem } from '@zhiva/utils';
import {
  CornerstoneToolNames,
  ElementTypes,
  MenuItems,
  MouseBindingMappings,
  MouseButtonTypes,
  ToolDisplayNames,
} from '@zhiva/utils';
import { Enums as CSToolsEnums } from '@cornerstonejs/tools';

export const MOUSE_ITEM_TOOL_KEY = 'mouse';
export const DRAWERS_ITEM_TOOL_KEY = 'drawers';
export const DIALOGS_ITEM_TOOL_KEY = 'dialogs';
export const ANNOTATION_ITEM_TOOL_KEY = 'annotations';

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
  dialogs: [
    {
      name: MenuItems.SegmentationDialog,
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
      mode: CSToolsEnums.ToolModes.Active,
      bindings: { mouseButton: CSToolsEnums.MouseBindings.Primary },
    },
    {
      name: CornerstoneToolNames.StackScroll,
      mode: CSToolsEnums.ToolModes.Disabled,
    },
    {
      name: CornerstoneToolNames.Pan,
      mode: CSToolsEnums.ToolModes.Active,
      bindings: { mouseButton: CSToolsEnums.MouseBindings.Auxiliary },
    },
    {
      name: CornerstoneToolNames.Zoom,
      mode: CSToolsEnums.ToolModes.Active,
      bindings: { mouseButton: CSToolsEnums.MouseBindings.Secondary },
    },
    {
      name: CornerstoneToolNames.Length,
      defaultMode: CSToolsEnums.ToolModes.Enabled,
      mode: CSToolsEnums.ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.RectangleROI,
      defaultMode: CSToolsEnums.ToolModes.Enabled,
      mode: CSToolsEnums.ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.PlanarFreehandROI,
      defaultMode: CSToolsEnums.ToolModes.Enabled,
      mode: CSToolsEnums.ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.ArrowAnnotate,
      defaultMode: CSToolsEnums.ToolModes.Enabled,
      mode: CSToolsEnums.ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.SegmentationDisplay,
      defaultMode: CSToolsEnums.ToolModes.Enabled,
      mode: CSToolsEnums.ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.Brush,
      defaultMode: CSToolsEnums.ToolModes.Enabled,
      mode: CSToolsEnums.ToolModes.Enabled,
    },
    {
      name: CornerstoneToolNames.StackScrollMouseWheel,
      mode: CSToolsEnums.ToolModes.Active,
    },
  ],
  menuItems: [],
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

const MenuProvider = ({
  children,
  defaultMenu,
}: {
  children: ReactNode;
  defaultMenu: Partial<DicomMenu>;
}) => {
  const [menu, dispatch] = useReducer(menuReducer, {
    ...initialState,
    ...defaultMenu,
  });

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
          mode: CSToolsEnums.ToolModes.Active,
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
            menu.drawers.find((el: any) => el.name === elementKey)?.isShown
          ),
        },
      });
    } else if (menuKey === DIALOGS_ITEM_TOOL_KEY) {
      dispatch({
        type: MenuActionTypes.SET_SHOW_DIALOG,
        payload: {
          dialog: elementKey,
          isShown: !Boolean(
            menu.dialogs.find((el: any) => el.name === elementKey)?.isShown
          ),
        },
      });
    } else {
      dispatch({
        type: MenuActionTypes.SET_TOOL_STATE,
        payload: {
          tool: elementKey,
          mode: CSToolsEnums.ToolModes.Active,
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
