import { Cornerstone3dReactViewportProps } from './Cornerstone3dReactViewportProps';
import { useRenderingEngine } from './hooks/useRenderingEngine';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useViewport } from './hooks/useViewport';
import { updateViewport } from './utils/updateViewport';
import { useViewportState } from './hooks/useViewportState';
import {
  LoadingOverlay,
  ViewportOrientationMarkers,
  ViewportOverlay,
} from '@zhiva/viewer-elements';
import { styled } from '@mui/system';
import { assignCSEventsListeners } from './utils/events/assignCSEventsListeners';
import {
  useCSEventDispatchCallback,
  useCSElementEventDispatchCallback,
} from './hooks/useEventDispatchCallback';
import { setCineState } from './utils/tools/setCineState';
import { assignCSElementEventsListeners } from './utils/events/assignCSElementEventsListeners';
import { useResizeDetector } from 'react-resize-detector';
import { destroyViewport } from './utils/destroyViewport';

const Container = styled('div')((props) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
}));

const ViewportContainer = styled('div')((props) => ({
  position: 'relative',
}));

const defaultProps: Partial<Cornerstone3dReactViewportProps> = {
  isPlaying: false,
  isOverlayVisible: true,
  cineFrameRate: 15,
  orientationMarkers: ['left', 'top'],
};

export function Cornerstone3dReactViewport(
  props: Cornerstone3dReactViewportProps
) {
  const {
    renderingEngine,
    viewport,
    orientationMarkers = defaultProps.orientationMarkers,
    isOverlayVisible = defaultProps.isOverlayVisible,
    isPlaying = defaultProps.isPlaying,
    cineFrameRate = defaultProps.cineFrameRate,
    OverlayComponent = ViewportOverlay,
  } = props;
  const { state, dispatch } = useViewportState();
  const renderingEngineInstance = useRenderingEngine(renderingEngine);
  const viewportElement = useRef<HTMLDivElement>(null);
  const containerElement = useRef<HTMLDivElement>(null);

  const onResize = useCallback(() => {
    // if (renderingEngineInstance && viewportElement.current != null) {
    //   renderingEngineInstance.resize(true);
    // }
  }, [renderingEngineInstance, viewportElement.current]);

  const { width, height } = useResizeDetector({
    targetRef: containerElement,
    onResize,
    refreshMode: 'throttle',
    refreshRate: 500,
    skipOnMount: false,
  });

  const viewportInstance = useViewport(
    renderingEngineInstance,
    viewportElement,
    viewport
  );
  const handleCSEventCallbacks = useCSEventDispatchCallback(dispatch, props);
  const handleCSToolsEventCallbacks = useCSElementEventDispatchCallback(
    dispatch,
    props
  );

  useEffect(() => {
    return () => {
      // console.log(viewportElement, viewportInstance, renderingEngineInstance, props);
      // if (
      //   viewportInstance != null &&
      //   renderingEngineInstance != null &&
      //   viewportElement.current != null
      // ) {
      //   destroyViewport(
      //     viewportInstance,
      //     renderingEngineInstance,
      //     props,
      //     viewportElement.current
      //   );
      // }
    };
  }, []);

  useEffect(() => {
    if (
      viewportInstance != null &&
      renderingEngineInstance != null &&
      viewportElement.current != null
    ) {
      // This is async function, but we don't really case when cornerstone executes it
      updateViewport(
        viewportInstance,
        renderingEngineInstance,
        props,
        viewportElement.current,
        props.endLoadHandler
      );
    }

    // return () => {
    //   console.log(viewportElement, viewportInstance, renderingEngineInstance, props);
    //   if (
    //     viewportInstance != null &&
    //     renderingEngineInstance != null
    //   ) {
    //     destroyViewport(
    //       viewportInstance,
    //       renderingEngineInstance,
    //       props,
    //     );
    //   }
    // };
  }, [viewportInstance, renderingEngineInstance, props]);

  useEffect(() => {
    if (viewportElement.current != null && viewportInstance) {
      if (!state.isLoading) {
        setCineState(
          Boolean(isPlaying),
          cineFrameRate || 15,
          viewportElement.current
        );
      }
    }
  }, [
    isPlaying,
    cineFrameRate,
    viewportElement.current,
    viewportInstance,
    state.isLoading,
  ]);

  useEffect(assignCSEventsListeners(handleCSEventCallbacks), [
    handleCSEventCallbacks,
  ]);
  useEffect(
    assignCSElementEventsListeners(
      handleCSToolsEventCallbacks,
      viewportElement.current
    ),
    [handleCSEventCallbacks, viewportElement.current]
  );

  const handleDisabledEvents = (e: any) => {
    e.preventDefault();
  };

  return (
    <Container ref={containerElement}>
      <ViewportContainer
        onContextMenu={handleDisabledEvents}
        onMouseDown={handleDisabledEvents}
        style={{ width: width || 500, height: height || 500 }}
        ref={viewportElement}
      >
        {(state.isLoading || state.error != null) && (
          <LoadingOverlay
            percentComplete={70}
            error={state.error ? state.error.message : undefined}
          />
        )}
        {isOverlayVisible && state.imageId && props.imageIds && (
          <OverlayComponent
            windowWidth={state.windowWidth}
            windowCenter={state.windowCenter}
            imageIdIndex={state.imageIdIndex}
            stackSize={props.imageIds.length}
            imageId={state.imageId}
            frameRate={state.isPlaying ? cineFrameRate || 15 : 0}
          />
        )}
        {state.imageId && orientationMarkers && (
          <ViewportOrientationMarkers
            imageId={state.imageId}
            orientationMarkers={orientationMarkers}
            isFlippedHorizontally={state.isFlippedHorizontally}
            isFlippedVertically={state.isFlippedVertically}
            rotationDegrees={state.rotationDegrees}
          />
        )}
      </ViewportContainer>
    </Container>
  );
}

export default Cornerstone3dReactViewport;
