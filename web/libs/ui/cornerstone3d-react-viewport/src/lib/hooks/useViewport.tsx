import {RefObject, useEffect, useState} from 'react';
import { RenderingEngine } from '@cornerstonejs/core';
import { Cornerstone3dReactViewportProps } from '../Cornerstone3dReactViewportProps';
import {
  IStackViewport,
  IVolumeViewport,
} from '@cornerstonejs/core/dist/esm/types';

export function useViewport(
  renderingEngine?: RenderingEngine,
  element?: RefObject<HTMLDivElement>,
  viewport?: Cornerstone3dReactViewportProps["viewport"]
): IStackViewport | IVolumeViewport | undefined {
  const [viewportInstance, setViewportInstance] = useState<IStackViewport | IVolumeViewport>();

  useEffect(() => {
    if (viewport?.id && renderingEngine && element?.current) {
      const viewportProps = {
        viewportId: viewport.id,
        type: viewport.type,
        defaultOptions: viewport.options,
        element: element.current,
      };
      renderingEngine.enableElement(viewportProps);
      setViewportInstance(renderingEngine.getViewport(viewport.id));
    }
  }, [viewport, element?.current, renderingEngine]);

  return viewportInstance;
}
