import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Cornerstone3dReactViewport } from './Cornerstone3dReactViewport';

import { CornerstoneToolNames } from '../../../../utils/src/constants';
import { Enums as CSToolsEnums } from '@cornerstonejs/tools';
import { CONSTANTS, Enums, volumeLoader } from '@cornerstonejs/core';
import { loadInstancesFromURI, VIEWPORT_TYPES } from '@zhiva/services';
import { useEffect, useState } from 'react';

const imageIds = [
  'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.7.dcm',
  'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.8.dcm',
  'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm',
  'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm',
  'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
];

const volumeId = 'volume-1';

export default {
  component: Cornerstone3dReactViewport,
  title: 'VIEWER/Cornerstone3dReactViewport',
  args: {
    imageIds,
    imageIdIndex: 0,
    toolGroup: { id: 'test-group-1' },
    tools: [
      {
        name: CornerstoneToolNames.Wwwc,
        mode: CSToolsEnums.ToolModes.Active,
        bindings: { mouseButton: CSToolsEnums.MouseBindings.Primary },
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
        name: CornerstoneToolNames.TrackballRotate,
        mode: CSToolsEnums.ToolModes.Active,
        bindings: {
          mouseButton: CSToolsEnums.MouseBindings.Secondary,
          modifierKey: CSToolsEnums.KeyboardBindings.Ctrl,
        },
      },
      {
        name: CornerstoneToolNames.StackScrollMouseWheel,
        mode: CSToolsEnums.ToolModes.Active,
      },
    ],
    viewport: {
      id: 'viewport-1',
      type: Enums.ViewportType.STACK,
    },
    renderingEngine: 'engine-1',
    isOverlayVisible: false,
  },
} as ComponentMeta<typeof Cornerstone3dReactViewport>;

const Template: ComponentStory<typeof Cornerstone3dReactViewport> = (
  args,
  context
) => {
  // @ts-ignore check if CS is loaded
  if (!Boolean(context.csLoaded)) {
    // @ts-ignore
    return <div />;
  }

  return <div style={{width: '90vw', height: '90vh'}}><Cornerstone3dReactViewport {...args} /></div>;
};

export const Primary = Template.bind({});
Primary.args = {};

export const WithPrefeaching = Template.bind({});
WithPrefeaching.args = {
  isStackPrefetchEnabled: true,
};
WithPrefeaching.argTypes = { onImageLoaded: { action: 'imageLoaded' } };

export const WithError = Template.bind({});
WithError.args = {
  imageIds: ['dicomweb://invalidURL'],
  isStackPrefetchEnabled: true,
};

export const IsPlaying = Template.bind({});
IsPlaying.args = {
  isStackPrefetchEnabled: true,
  isPlaying: true,
};

export const WithOverlay = Template.bind({});
WithOverlay.args = {
  isStackPrefetchEnabled: true,
  isOverlayVisible: true,
};

const VolumeTemplate: ComponentStory<typeof Cornerstone3dReactViewport> = (
  args,
  context
) => {
  const [volumeLoaded, setVolumeLoaded] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (context.csLoaded) {
      async function loadVolume() {
        // Get Cornerstone imageIds and fetch metadata into RAM
        const volumeImageIds = await loadInstancesFromURI({
          StudyInstanceUID:
            '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
          SeriesInstanceUID:
            '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
          wadoRsRoot: 'https://d1qmxk7r72ysft.cloudfront.net/dicomweb',
          type: VIEWPORT_TYPES.VOLUME,
        });

        const stackImageIds = await loadInstancesFromURI({
          StudyInstanceUID:
            '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
          SeriesInstanceUID:
            '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
          wadoRsRoot: 'https://d1qmxk7r72ysft.cloudfront.net/dicomweb',
          type: VIEWPORT_TYPES.STACK,
        });
        const volume = await volumeLoader.createAndCacheVolume(volumeId, {
          imageIds: volumeImageIds,
        });
        // @ts-ignore
        volume.load();
        setVolumeLoaded(true);
      }

      loadVolume();
    }
    // @ts-ignore
  }, [context.csLoaded]);
  // @ts-ignore check if CS is loaded
  if (!Boolean(context.csLoaded)) {
    // @ts-ignore
    return <div />;
  }
  return (
    <div>
      <Cornerstone3dReactViewport {...args} />
    </div>
  );
};

export const Volume = VolumeTemplate.bind({});
Volume.args = {
  viewport: {
    id: 'viewport-1',
    type: Enums.ViewportType.ORTHOGRAPHIC,
    options: {
      orientation: Enums.OrientationAxis.AXIAL,
    },
  },
  volumes: [
    {
      volumeId: volumeId,
    },
  ],
  isStackPrefetchEnabled: true,
  isOverlayVisible: true,
};

const copyProps = {
  imageIds,
  imageIdIndex: 0,
  toolGroup: { id: 'test-group-1' },
  viewport: {
    id: 'viewport-2',
    type: Enums.ViewportType.STACK,
  },
  renderingEngine: 'engine-1',
};

// const MultiView: ComponentStory<typeof Cornerstone3dReactViewport> = (
//   args,
//   context
// ) => {
//   // @ts-ignore check if CS is loaded
//   if (!Boolean(context.csLoaded)) {
//     // @ts-ignore
//     return <div />;
//   }
//   return (
//     <div>
//       <Cornerstone3dReactViewport {...args} />
//       <Cornerstone3dReactViewport {...copyProps} />
//     </div>
//   );
// };

// export const SyncTools = MultiView.bind({});
// SyncTools.args = {
//   isStackPrefetchEnabled: true,
//   isOverlayVisible: true,
// };
