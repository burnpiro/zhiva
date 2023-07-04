import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  DIALOGS_ITEM_TOOL_KEY,
  MenuActionTypes,
  MenuContext,
  SegmentationContext,
  StudiesContext,
} from '@zhiva/react-contexts';
import {
  AnnotationDrawer,
  MENU_HEIGHT,
  SegmentationDialog,
  SegmentationDrawer,
  SeriesDrawer,
  ToolButton,
  ViewerMenu,
} from '@zhiva/viewer-elements';
import {
  MeasurementTools,
  MenuItems,
  MouseBindingMappings,
} from '@zhiva/utils';
import { Cornerstone3dReactViewport } from '@zhiva/cornerstone3d-react-viewport';
import { Enums, cache, volumeLoader } from '@cornerstonejs/core';
import { Button, Typography, Grid } from '@zhiva/ui-components';
import * as cornerstoneTools from '@cornerstonejs/tools';
import {
  AnnotationService,
  Segmentation,
  SegmentationService,
  ToolGroupService,
} from '@zhiva/services';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StreamingImageVolume } from '@cornerstonejs/streaming-image-volume-loader';
import { SeriesElement } from '@zhiva/utils';
import { Enums as CSToolsEnums } from '@cornerstonejs/tools';
const { Enums: csToolsEnums } = cornerstoneTools;

const VOLUME_LOADER_SCHEME = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use
const TOOL_GROUP_ID = 'MY_TOOLGROUP_ID';
const ENGINE_ID = 'ENGINE_ID';
const VIEWPORT_ID = 'VIEWPORT_ID';

export function ViewerContainer() {
  let { studyId = '' } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const annotationService = useRef<AnnotationService | null>(null);
  const { studies } = useContext(StudiesContext);
  const { segmentationServices, initializeSegService } =
    useContext(SegmentationContext);
  const { menu, selectTool, selectOption } = useContext(MenuContext);
  const [volumeId, setVolumeId] = useState<string | null>(null);

  const selectedStudy = studies.get(studyId);

  const [selectedSeries, setSelectedSeries] = useState<SeriesElement>(
    selectedStudy?.series.values().next().value || {}
  );
  const VOLUME_ID = `${VOLUME_LOADER_SCHEME}:${selectedSeries.SeriesInstanceUID}-VOL`;
  const SEG_VOL_ID = `${selectedSeries.SeriesInstanceUID}-SEG`;
  const selectedSeriesUIDs = [selectedSeries.SeriesInstanceUID];

  const imageIds = selectedSeries.imageIds;

  const availableMeasurementTools = menu.tools
    .filter(
      (el) =>
        el.mode !== CSToolsEnums.ToolModes.Disabled &&
        MeasurementTools.includes(el.name)
    )
    .map((el) => el.name);

  useEffect(() => {
    initializeSegService(studyId);
  }, [studyId]);

  useEffect(() => {
    const loadVolumeFromImages = async () => {
      const loadedVolume = await cache.getVolumeLoadObject(VOLUME_ID);
      if (!loadedVolume) {
        const volume = await volumeLoader.createAndCacheVolume(VOLUME_ID, {
          imageIds: imageIds,
        });

        volume['load']();
        setVolumeId(VOLUME_ID);
      } else {
        if (volumeId !== VOLUME_ID) {
          const volume = cache.getVolume(VOLUME_ID) as StreamingImageVolume;
          if (volume) {
            setVolumeId(VOLUME_ID);
          }
        }
      }
    };
    if (studyId && segmentationServices[studyId] && VOLUME_ID !== volumeId) {
      loadVolumeFromImages();
    }
  }, [segmentationServices, studyId, VOLUME_ID]);

  const addNewSegmentationToService = async (
    segmentationService: SegmentationService,
    {
      toolGroupId,
      labelMapId,
      segId,
    }: {
      toolGroupId?: string;
      labelMapId?: number;
      segId?: string;
    } = {
      toolGroupId: TOOL_GROUP_ID,
      labelMapId: 0,
      segId: SEG_VOL_ID,
    }
  ) => {
    let newSeg: Segmentation | undefined = undefined;
    try {
      newSeg = await segmentationService.generateSegmentationForVolume(
        {
          id: segId || SEG_VOL_ID,
          label: `Segmentation ${segmentationService.segmentations.length + 1}`,
        },
        VOLUME_ID,
        labelMapId || 0
      );
    } catch (e: any) {
      console.error(e);
    }
    try {
      const segmentationsForVolume = segmentationService.segmentations.filter(
        (seg) => seg.assignedVolume === VOLUME_ID && seg.id === newSeg?.id
      );
      await ToolGroupService.addSegmentationsToToolGroup(
        segmentationsForVolume,
        toolGroupId || TOOL_GROUP_ID
      );
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleViewportLoaded = async (csElement: HTMLDivElement) => {
    annotationService.current = new AnnotationService({ csElement: csElement });
    try {
      if (studyId && segmentationServices[studyId]) {
        console.log('viewportLoaded');

        await segmentationServices[studyId].generateSegmentationForVolume(
          { id: SEG_VOL_ID },
          VOLUME_ID
        );
      }
    } catch (e: any) {
      console.error(e);
    }
    try {
      if (studyId && segmentationServices[studyId]) {
        const segmentationsForVolume = segmentationServices[
          studyId
        ].segmentations.filter((seg) => seg.assignedVolume === VOLUME_ID);
        await ToolGroupService.addSegmentationsToToolGroup(
          segmentationsForVolume,
          TOOL_GROUP_ID
        );
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleBack = () => {
    navigate(`/`);
  };

  const handleMenuItemClick = (itemKey: string) => {
    selectTool(itemKey);
  };

  const handleMenuItemSelect = (itemKey: string, value?: string) => {
    selectOption(itemKey, value || '');
  };

  const activeTools = menu.tools
    .filter(
      (tool) =>
        tool.mode === csToolsEnums.ToolModes.Active &&
        tool.bindings?.mouseButton ===
          MouseBindingMappings[menu.selectedMouseSide]
    )
    .map((tool) => tool.name);

  const activeDrawers = menu.drawers
    .filter((drawer) => drawer.isShown)
    .map((drawer) => drawer.name);

  const onSelectSeries = (seriesUID: string) => {
    if (selectedStudy?.series.has(seriesUID)) {
      setSelectedSeries(selectedStudy?.series.get(seriesUID) as SeriesElement);
    }
  };

  const onToggleSegmentationSettings = () => {
    selectOption(DIALOGS_ITEM_TOOL_KEY, MenuItems.SegmentationDialog);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            width: '48px',
            height: MENU_HEIGHT,
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <ToolButton
            name={'Back to list'}
            isActive={true}
            onClick={handleBack}
            customIcon={<ArrowBackIcon />}
          />
        </Box>

        <Box sx={{ width: 'calc(100% - 48px)' }}>
          <ViewerMenu
            activeTools={[
              ...menu.activeMenuItems,
              ...activeTools,
              ...activeDrawers,
            ]}
            disabledTools={[]}
            tools={menu.menuItems}
            handleItemClick={handleMenuItemClick}
            handleItemSelect={handleMenuItemSelect}
          />
        </Box>
      </Box>
      <div
        style={{ height: `calc(100% - ${MENU_HEIGHT}px)`, width: '100%' }}
        ref={containerRef}
      >
        <Grid container spacing={0} sx={{ height: `100%`, width: '100%' }}>
          {menu.drawers.find(
            (drawer) => drawer.name === MenuItems.SeriesList && drawer.isShown
          ) &&
            selectedStudy && (
              <SeriesDrawer
                series={selectedStudy.series}
                showDrawer={true}
                containerRef={containerRef}
                selectedSeries={selectedSeriesUIDs}
                onSelectSeries={onSelectSeries}
              />
            )}
          {menu.drawers.find(
            (drawer) =>
              drawer.name === MenuItems.SegmentationList && drawer.isShown
          ) &&
            studyId &&
            segmentationServices[studyId] && (
              <SegmentationDrawer
                segmentationService={segmentationServices[studyId]}
                toolGroupId={TOOL_GROUP_ID}
                volumeId={VOLUME_ID}
                showDrawer={true}
                containerRef={containerRef}
                selectedClasses={[]}
                onOpenSettings={onToggleSegmentationSettings}
                onAddNewSegmentation={addNewSegmentationToService}
              />
            )}
          {menu.drawers.find(
            (drawer) =>
              drawer.name === MenuItems.AnnotationList && drawer.isShown
          ) &&
            studyId &&
            annotationService.current && (
              <AnnotationDrawer
                annotationService={annotationService.current}
                showDrawer={true}
                containerRef={containerRef}
                onSelectAnnotationTool={handleMenuItemClick}
                availableTools={availableMeasurementTools}
              />
            )}
          <Grid item xs={12}>
            {!studies.has(studyId) && (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant={'h5'}>
                  Selected study doesn't exits
                </Typography>
                <Typography
                  variant={'subtitle2'}
                  sx={{ backgroundColor: '#444' }}
                >
                  {studyId}
                </Typography>
                <Button onClick={handleBack}>Go Back</Button>
              </Box>
            )}
            {volumeId && (
              <Cornerstone3dReactViewport
                // imageIds={imageIds}
                imageIdIndex={0}
                viewport={{
                  id: VIEWPORT_ID,
                  type: Enums.ViewportType.ORTHOGRAPHIC,
                  options: {
                    orientation: Enums.OrientationAxis.AXIAL,
                    background: [0, 0, 0],
                  },
                }}
                volumes={[
                  {
                    volumeId: volumeId,
                  },
                ]}
                tools={menu.tools}
                toolGroup={{ id: TOOL_GROUP_ID }}
                renderingEngine={ENGINE_ID}
                isOverlayVisible={true}
                endLoadHandler={handleViewportLoaded}
              />
            )}
          </Grid>
        </Grid>
      </div>
      {menu.dialogs.find(
        (dialog) =>
          dialog.name === MenuItems.SegmentationDialog && dialog.isShown
      ) &&
        studyId &&
        segmentationServices[studyId] && (
          <SegmentationDialog
            segmentationService={segmentationServices[studyId]}
            toolGroupId={TOOL_GROUP_ID}
            showDialog={true}
            onClose={onToggleSegmentationSettings}
          />
        )}
    </Box>
  );
}
