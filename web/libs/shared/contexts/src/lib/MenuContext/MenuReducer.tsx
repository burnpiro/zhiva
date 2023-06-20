import { ActionMap, DicomMenu } from '@zhiva/utils';
import { MouseButtonTypes } from '@zhiva/utils';
import { MouseClickedIcon } from './MouseClickedIcon/MouseClickedIcon';
import { MOUSE_ITEM_TOOL_KEY } from './MenuContext';
import { Enums as CSToolsEnums } from '@cornerstonejs/tools';

export enum MenuActionTypes {
  SET_TOOL_STATE = 'SET_TOOL_STATE',
  REMOVE_TOOL = 'REMOVE_TOOL',
  SET_PLAYING = 'SET_PLAYING',
  SET_ACTIVE_TOOLS = 'SET_ACTIVE_TOOLS',
  ADD_ACTIVE_TOOLS = 'ADD_ACTIVE_TOOLS',
  REMOVE_ACTIVE_TOOLS = 'REMOVE_ACTIVE_TOOLS',
  SET_DISABLED_TOOLS = 'SET_DISABLED_TOOLS',
  ADD_DISABLED_TOOLS = 'ADD_DISABLED_TOOLS',
  REMOVE_DISABLED_TOOLS = 'REMOVE_DISABLED_TOOLS',
  SET_MOUSE_SIDE = 'SET_MOUSE_SIDE',
  SET_CINE_RATE = 'SET_CINE_RATE',
  SET_IMAGE_IDX = 'SET_IMAGE_IDX',
  SET_SHOW_DRAWER = 'SET_SHOW_DRAWER',
  SET_SHOW_DIALOG = 'SET_SHOW_DIALOG',
}

type MenuPayload = {
  [MenuActionTypes.SET_TOOL_STATE]: {
    tool: string;
    mode: CSToolsEnums.ToolModes;
    mouseBinding: CSToolsEnums.MouseBindings;
    modifier?: CSToolsEnums.KeyboardBindings;
  };
  [MenuActionTypes.REMOVE_TOOL]: {
    tool: string;
  };
  [MenuActionTypes.SET_PLAYING]: {
    isPlaying: boolean;
  };
  [MenuActionTypes.SET_ACTIVE_TOOLS]: {
    tools: string[];
  };
  [MenuActionTypes.ADD_ACTIVE_TOOLS]: {
    tools: string[];
  };
  [MenuActionTypes.REMOVE_ACTIVE_TOOLS]: {
    tools: string[];
  };
  [MenuActionTypes.SET_DISABLED_TOOLS]: {
    tools: string[];
  };
  [MenuActionTypes.ADD_DISABLED_TOOLS]: {
    tools: string[];
  };
  [MenuActionTypes.REMOVE_DISABLED_TOOLS]: {
    tools: string[];
  };
  [MenuActionTypes.SET_MOUSE_SIDE]: {
    selectedMouseSide: MouseButtonTypes;
  };
  [MenuActionTypes.SET_CINE_RATE]: {
    cineFrameRate: number;
  };
  [MenuActionTypes.SET_IMAGE_IDX]: {
    imageIdIndex: number;
  };
  [MenuActionTypes.SET_SHOW_DRAWER]: {
    drawer: string;
    isShown: boolean;
  };
  [MenuActionTypes.SET_SHOW_DIALOG]: {
    dialog: string;
    isShown: boolean;
  };
};

export type MenuActions = ActionMap<MenuPayload>[keyof ActionMap<MenuPayload>];

export const menuReducer = (state: DicomMenu, action: MenuActions) => {
  switch (action.type) {
    case MenuActionTypes.SET_TOOL_STATE:
      return {
        ...state,
        tools: state.tools.map((prevEl) => {
          if (prevEl.name === action.payload.tool) {
            return {
              ...prevEl,
              mode: action.payload.mode,
              bindings:
                action.payload.mode === CSToolsEnums.ToolModes.Active
                  ? {
                      mouseButton: action.payload.mouseBinding,
                      modifierKey: action.payload.modifier
                        ? action.payload.modifier
                        : undefined,
                    }
                  : undefined,
            };
          } else if (
            prevEl.bindings?.mouseButton === action.payload.mouseBinding &&
            prevEl.bindings?.modifierKey === action.payload.modifier
          ) {
            return {
              ...prevEl,
              bindings: undefined,
              mode: prevEl.defaultMode
                ? prevEl.defaultMode
                : CSToolsEnums.ToolModes.Disabled,
            };
          }
          return prevEl;
        }),
      };
    case MenuActionTypes.REMOVE_TOOL:
      return {
        ...state,
        tools: state.tools.filter((el) => el.name !== action.payload.tool),
      };
    case MenuActionTypes.SET_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
      };
    case MenuActionTypes.SET_CINE_RATE:
      return {
        ...state,
        cineFrameRate: action.payload.cineFrameRate,
      };
    case MenuActionTypes.SET_IMAGE_IDX:
      return {
        ...state,
        imageIdIndex: action.payload.imageIdIndex,
      };
    case MenuActionTypes.SET_MOUSE_SIDE:
      return {
        ...state,
        selectedMouseSide: action.payload.selectedMouseSide,
        menuItems: state.menuItems.map((item) => {
          if (item.toolKey === MOUSE_ITEM_TOOL_KEY) {
            return {
              ...item,
              customIcon: (
                <MouseClickedIcon side={action.payload.selectedMouseSide} />
              ),
            };
          }
          return item;
        }),
      };
    case MenuActionTypes.SET_ACTIVE_TOOLS:
      return {
        ...state,
        activeMenuItems: [...action.payload.tools],
      };
    case MenuActionTypes.ADD_ACTIVE_TOOLS:
      return {
        ...state,
        activeMenuItems: Array.from(
          new Set([...state.activeMenuItems, ...action.payload.tools])
        ),
      };
    case MenuActionTypes.REMOVE_ACTIVE_TOOLS:
      return {
        ...state,
        activeMenuItems: state.activeMenuItems.filter(
          (el) => !action.payload.tools.includes(el)
        ),
      };
    case MenuActionTypes.SET_DISABLED_TOOLS:
      return {
        ...state,
        disabledMenuItems: [...action.payload.tools],
      };
    case MenuActionTypes.ADD_DISABLED_TOOLS:
      return {
        ...state,
        disabledMenuItems: Array.from(
          new Set([...state.disabledMenuItems, ...action.payload.tools])
        ),
      };
    case MenuActionTypes.REMOVE_DISABLED_TOOLS:
      return {
        ...state,
        disabledMenuItems: state.disabledMenuItems.filter(
          (el) => !action.payload.tools.includes(el)
        ),
      };
    case MenuActionTypes.SET_SHOW_DRAWER:
      return {
        ...state,
        drawers: state.drawers.map((el) =>
          el.name === action.payload.drawer
            ? { ...el, isShown: action.payload.isShown }
            : el
        ),
      };
    case MenuActionTypes.SET_SHOW_DIALOG:
      return {
        ...state,
        dialogs: state.dialogs.map((el) =>
          el.name === action.payload.dialog
            ? { ...el, isShown: action.payload.isShown }
            : el
        ),
      };
    default:
      return state;
  }
};
