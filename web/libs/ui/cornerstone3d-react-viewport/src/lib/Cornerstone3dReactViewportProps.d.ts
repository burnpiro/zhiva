import { RenderingEngine, Types } from '@cornerstonejs/core';
import { FC } from 'react';
import { ViewportOverlayProps } from '@zhiva/viewer-elements';
import { CSTool } from '@zhiva/utils';

export interface Cornerstone3dReactViewportProps {
  imageIds?: string[];
  volumes?: Types.IVolumeInput[];
  imageIdIndex?: number;
  isPlaying?: boolean;
  cineFrameRate?: number;
  orientationMarkers?: ('top' | 'left' | 'bottom' | 'right')[];
  viewport: {
    type: Types.ViewportType;
    id: string;
    options?: any;
  };
  renderingEngine?: string | RenderingEngine;
  toolGroup?: {
    id: string;
  };
  tools?: CSTool[];
  isStackPrefetchEnabled?: boolean;
  isOverlayVisible?: boolean;
  loadIndicatorDelay?: number;
  enableResizeDetector?: boolean;
  resizeRefreshRateMs?: number;
  resizeRefreshMode?: 'debounce' | 'throttle';
  onNewImageDebounceTime?: number;
  startLoadHandler?: () => void;
  endLoadHandler?: (csElement: HTMLDivElement) => void;
  onImageLoaded?: (imageId: string) => void;
  onLoadingProgress?: (progress: number) => void;
  OverlayComponent?: FC<ViewportOverlayProps>;
}
