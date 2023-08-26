import {
  BrushColorClass,
  DEFAULT_SEG_CLASS_NAME,
  DIALOGS,
  InstanceElement,
  SeriesElement,
  SeriesList,
} from '@zhiva/utils';
import { Dialog, Drawer } from '@zhiva/ui-components';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import {
  Segmentation,
  SegmentationService,
  ToolGroupService,
} from '@zhiva/services';
import {
  parseNameToClassString,
  parseRGBAtoString,
} from '@zhiva/utils-cornerstone';
import { useState } from 'react';
import ColorPicker from '../../ColorPicker/ColorPicker';

/* eslint-disable-next-line */
export interface SegmentationDialogProps {
  segmentationService: SegmentationService;
  toolGroupId: string;
  showDialog: boolean;
  onClose: () => void;
}

export function SegmentationDialog({
  segmentationService,
  toolGroupId,
  showDialog = false,
  onClose,
}: SegmentationDialogProps) {
  const [classes, setClasses] = useState<BrushColorClass[]>(
    segmentationService.classes
  );
  const [unsaved, setUnsaved] = useState<boolean>(false);

  const saveSettings = () => {
    segmentationService.mergeClasses(classes);
    setUnsaved(false);
    onClose();
  };

  const onAddNewClass = () => {
    const currLabelMapIndex =
      classes.reduce(
        (acc, currClass) =>
          currClass.activeLabelmapIndex > acc
            ? currClass.activeLabelmapIndex
            : acc,
        0
      ) + 1;

    setClasses([
      ...classes,
      segmentationService.generateNewClass(
        `Segmentation class ${classes.length + 1}`,
        [100, 100, 100, 100],
        currLabelMapIndex
      ),
    ]);
    setUnsaved(true);
  };

  const onClassNameChange = (event: any) => {
    const value = event.target.value;
    const classId = event.target.dataset.classid;

    setClasses([
      ...classes.map((el) =>
        el.classId === classId ? { ...el, name: value } : el
      ),
    ]);
    setUnsaved(true);
  };

  const onClassColorChange = (
    classId: string,
    color: BrushColorClass['color']
  ) => {
    setClasses([
      ...classes.map((el) =>
        el.classId === classId ? { ...el, color: color, modified: true } : el
      ),
    ]);
    setUnsaved(true);
  };

  return (
    <Dialog
      isOpen={showDialog}
      title={DIALOGS.SEGMENTATION_DIALOG}
      onClose={onClose}
      onSubmit={saveSettings}
      submitEnabled={unsaved}
      submitMessage={'Save Changes'}
    >
      {classes.map(({ classId, color, name }) => (
        <MenuItem key={classId}>
          <ListItemIcon sx={{ minWidth: 0, mr: 3 }}>
            <ColorPicker
              selectedColor={color}
              id={classId}
              onChange={onClassColorChange}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <TextField
                value={name}
                inputProps={{ 'data-classid': classId }}
                variant="standard"
                onChange={onClassNameChange}
                error={name.length < 1}
                helperText={
                  name.length < 1
                    ? 'Class with this name is already defined'
                    : ''
                }
              />
            }
          />
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={onAddNewClass}>
        <ListItemIcon sx={{ minWidth: 0, mr: 1, mt: 1 }}>
          <AddOutlinedIcon fontSize={'medium'} />
        </ListItemIcon>
        Create New Class
      </MenuItem>
    </Dialog>
  );
}

export default SegmentationDialog;
