import { RefObject, useEffect, useState } from 'react';
import { RenderingEngine, Types as CSTypes } from '@cornerstonejs/core';
import { Cornerstone3dReactViewportProps } from '../Cornerstone3dReactViewportProps';
import {ToolGroupManager} from "@cornerstonejs/tools";

export function useViewport(
  renderingEngine?: RenderingEngine,
  element?: RefObject<HTMLDivElement>,
  viewport?: Cornerstone3dReactViewportProps['viewport']
): CSTypes.IStackViewport | CSTypes.IVolumeViewport | undefined {
  const [viewportInstance, setViewportInstance] = useState<
    CSTypes.IStackViewport | CSTypes.IVolumeViewport
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
      if (
        currViewport &&
        currViewport.element === element.current &&
        currViewport.type === viewport.type &&
        JSON.stringify(viewportProps.defaultOptions) ===
          JSON.stringify(currViewport.options)
      ) {
        // If viewport with the same props and assigned to the same element exists
        // Do not re-enable the same viewport, cornerstone recreated instance from scratch, and we don't want to update object if it's the same object
        return;
      }
      console.log('enable element')
      renderingEngine.enableElement(viewportProps);
      setViewportInstance(renderingEngine.getViewport(viewport.id));
    }

    return () => {
      if (viewport?.id && renderingEngine && !element?.current) {
        const toolGroupInstance = ToolGroupManager.getToolGroupForViewport(viewport.id, renderingEngine.id);


        if(toolGroupInstance) {
          toolGroupInstance.removeViewports(renderingEngine.id, viewport.id);
        }

        const currViewport = renderingEngine.getViewport(viewport.id);
        if (
          currViewport &&
          currViewport.type === viewport.type &&
          JSON.stringify(viewport.options) ===
            JSON.stringify(currViewport.options)
        ) {
          console.log('disable element')
          currViewport.removeAllActors();
          renderingEngine.disableElement(viewport.id);
          setViewportInstance(undefined);
        }
      }
    };
  }, [viewport, element?.current, renderingEngine]);

  return viewportInstance;
}
