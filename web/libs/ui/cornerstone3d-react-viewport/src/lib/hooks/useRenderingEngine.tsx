import { useEffect, useState } from 'react';
import { RenderingEngine, getRenderingEngine } from '@cornerstonejs/core';

export function useRenderingEngine(
  renderingEngine?: string | RenderingEngine
): RenderingEngine | undefined {
  const [engine, setEngine] = useState<RenderingEngine>();

  useEffect(() => {
    if (typeof renderingEngine === 'string') {
      const existingRenderingEngine = getRenderingEngine(renderingEngine);
      if (existingRenderingEngine) {
        setEngine(existingRenderingEngine as RenderingEngine);
      } else {
        setEngine(new RenderingEngine(renderingEngine));
      }
    } else if (renderingEngine instanceof RenderingEngine) {
      setEngine(renderingEngine);
    }
  }, [renderingEngine]);
  return engine;
}
