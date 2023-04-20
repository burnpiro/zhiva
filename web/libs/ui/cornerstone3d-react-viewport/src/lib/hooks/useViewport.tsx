import { RefObject, useEffect, useState } from 'react';
import { RenderingEngine } from '@cornerstonejs/core';
import { Cornerstone3dReactViewportProps } from '../Cornerstone3dReactViewportProps';
import {
  IStackViewport,
  IVolumeViewport,
} from '@cornerstonejs/core/dist/esm/types';

export function useViewport(
  renderingEngine?: RenderingEngine,
  element?: RefObject<HTMLDivElement>,
  viewport?: Cornerstone3dReactViewportProps['viewport']
): IStackViewport | IVolumeViewport | undefined {
  const [viewportInstance, setViewportInstance] = useState<
    IStackViewport | IVolumeViewport
  >();

  useEffect(() => {
    if (viewport?.id && renderingEngine && element?.current) {
      const viewportProps = {
        viewportId: viewport.id,
        type: viewport.type,
        defaultOptions: viewport.options,
        element: element.current,
      };
      // console.log(viewportProps);
      const currViewport = renderingEngine.getViewport(viewport.id);
      if(currViewport && currViewport.element === element.current && currViewport.type === viewport.type && JSON.stringify(viewportProps.defaultOptions) === JSON.stringify(currViewport.options)) {
        // If viewport with the same props and assigned to the same element exists
        // Do not re-enable the same viewport, cornerstone recreated instance from scratch, and we don't want to update object if it's the same object
        return;
      }
      renderingEngine.enableElement(viewportProps);
      setViewportInstance(renderingEngine.getViewport(viewport.id));
    }
  }, [viewport, element?.current, renderingEngine]);

  return viewportInstance;
}
