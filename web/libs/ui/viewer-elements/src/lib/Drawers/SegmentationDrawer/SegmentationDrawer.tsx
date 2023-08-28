import {
  BrushColorClass,
  InstanceElement,
  SeriesElement,
  SeriesList,
} from '@zhiva/utils';
import { Drawer } from '@zhiva/ui-components';
import { RefObject, useState } from 'react';
import { DrawerWidths } from '@zhiva/utils';
import {
  Segmentation,
  SegmentationService,
  ToolGroupService,
} from '@zhiva/services';
import { useSegmentationState } from '@zhiva/hooks';
import BrushClassSelect from '../../BrushClassSelect/BrushClassSelect';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { SegmentationDialog } from '../../Dialogs';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

/* eslint-disable-next-line */
export interface SegmentationDrawerProps {
  segmentationService: SegmentationService;
  toolGroupId: string;
  volumeId: string;
  showDrawer: boolean;
  containerRef: RefObject<HTMLDivElement>;
  selectedClasses: string[];
  onOpenSettings: () => void;
  onAddNewSegmentation: (
    segmentationService: SegmentationService,
    segmentationProps: {
      toolGroupId?: string;
      labelMapId?: number;
      segId?: string;
    }
  ) => void;
}

export function SegmentationDrawer({
  segmentationService,
  toolGroupId,
  volumeId,
  showDrawer = false,
  containerRef,
  onOpenSettings,
  onAddNewSegmentation,
}: SegmentationDrawerProps) {
  const segState = useSegmentationState(toolGroupId);
  const segmentations = segmentationService.segmentations.filter(
    (seg) => seg.assignedVolume === volumeId
  );

  const handleSelectedClassChange = (segId: Segmentation['id']) => {
    const selectedSeg = segmentations.find((seg) => seg.id === segId);
    if (selectedSeg) {
      ToolGroupService.setActiveSegmentation(toolGroupId, selectedSeg);
    }
  };

  const handleActiveClassChange = (segId: string, checked: boolean) => {
    const selectedSeg = segmentations.find((seg) => seg.id === segId);
    if (selectedSeg) {
      ToolGroupService.setSegmentationVisibility(
        toolGroupId,
        selectedSeg,
        checked
      );
    }
  };

  const onChangeSegmentationBrushClass = (segId: string, classId: string) => {
    const selectedSeg = segmentations.find((seg) => seg.id === segId);

    const selectedClass = segmentationService.classes.find(
      (brushClass) => brushClass.classId === classId
    );

    console.log(segId, classId);
    if (selectedSeg && selectedClass) {
      ToolGroupService.setSegmentationColor(
        toolGroupId,
        selectedSeg,
        selectedClass.activeLabelmapIndex
      );
      segmentationService.setBrushClassForSegmentation(
        selectedSeg.id,
        selectedClass.classId
      );
    }
  };
  // console.log(segmentations);
  // console.log(segState);

  const handleOpenSettings = () => {
    onOpenSettings();
  };

  const handleAddNewSegmentation = () => {
    onAddNewSegmentation(segmentationService, {
      toolGroupId: toolGroupId,
      segId: `segmentation-${segmentationService.segmentations.length + 1}`,
    });
  };

  return (
    <Drawer
      showDrawer={showDrawer}
      width={DrawerWidths.SEGMENTATION}
      containerRef={containerRef}
      position={'right'}
    >
      <Box
        id="segmentation-list-header"
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          justifyContent: 'space-between',
          pl: 2,
          pr: 2,
          alignItems: 'center',
        }}
      >
        Segmentations
        <IconButton
          edge="end"
          aria-label="open settings"
          onClick={handleOpenSettings}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      <BrushClassSelect
        segmentations={segmentations}
        classes={segmentationService.classes}
        activeClasses={segState.activeSegmentations}
        onSegmentationSelect={handleSelectedClassChange}
        onActiveChange={handleActiveClassChange}
        selectedSegmentations={segState.selectedSegmentations}
        onChangeSegmentationBrushClass={onChangeSegmentationBrushClass}
      />
      <MenuItem onClick={handleAddNewSegmentation}>
        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
          <AddOutlinedIcon fontSize={'medium'} />
        </ListItemIcon>
        New Segmentation
      </MenuItem>
    </Drawer>
  );
}

export default SegmentationDrawer;
