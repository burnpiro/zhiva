import { Drawer } from '@zhiva/ui-components';
import { RefObject, useState } from 'react';
import { CSTool, DrawerWidths, ToolDisplayNames } from '@zhiva/utils';
import { useAnnotationState } from '@zhiva/hooks';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AnnotationDisplay from '../../AnnotationDisplay/AnnotationDisplay';
import { AnnotationService } from '@zhiva/services';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/* eslint-disable-next-line */
export interface AnnotationDrawerProps {
  annotationService: AnnotationService;
  showDrawer: boolean;
  containerRef: RefObject<HTMLDivElement>;
  onSelectAnnotationTool?: (toolName: string) => void;
  availableTools?: string[];
}

export function AnnotationDrawer({
  annotationService,
  containerRef,
  showDrawer = false,
  onSelectAnnotationTool,
  availableTools,
}: AnnotationDrawerProps) {
  const annotationState = useAnnotationState(annotationService);
  const [selectedTool, setSelectedTool] = useState<string>('');

  const handleSelectAnnotation = (annotationId: string) => {
    annotationService.setSelectedAnnotation(annotationId);
    if (onSelectAnnotationTool) {
      const selectedAnnotation = annotationState.annotations.find(
        (el) => el.annotationUID === annotationId
      );
      if (selectedAnnotation) {
        onSelectAnnotationTool(selectedAnnotation.metadata.toolName);
      }
    }
  };

  const handleAnnotationLabelChange = (annotationId: string, label: string) => {
    annotationService.setAnnotationLabel(annotationId, label);
  };

  // const handleChangeAnnotationVisibility = (
  //   annotationId: string,
  //   checked: boolean
  // ) => {
  //   annotationService.setAnnotationVisibility(annotationId, checked);
  // };

  const handleSelectedToolChange = (event: SelectChangeEvent) => {
    setSelectedTool(event.target.value);
  };

  const handleDeleteAnnotation = (annotationId: string) => {
    annotationService.deleteAnnotation(annotationId);
  };

  return (
    <Drawer
      showDrawer={showDrawer}
      width={DrawerWidths.ANNOTATION}
      containerRef={containerRef}
      position={'right'}
    >
      <Box
        id="annotations-list-header"
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          justifyContent: 'space-between',
          pl: 2,
          pr: 2,
          alignItems: 'baseline',
        }}
      >
        <Typography>Annotations</Typography>
        {availableTools && (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Tool Filter
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedTool}
              onChange={handleSelectedToolChange}
              label="Tool Filter"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {availableTools.map((tool) => (
                <MenuItem key={tool} value={tool}>
                  {ToolDisplayNames[tool as keyof typeof ToolDisplayNames] ||
                    tool}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      {annotationState.annotations
        .filter((annotation) =>
          selectedTool !== ''
            ? annotation.metadata.toolName === selectedTool
            : true
        )
        .map((annotation) => (
          <AnnotationDisplay
            key={annotation.annotationUID || ''}
            annotation={annotation}
            isVisible={
              !annotationState.hiddenAnnotations.includes(
                annotation.annotationUID || ''
              )
            }
            isSelected={annotationState.selectedAnnotations.includes(
              annotation.annotationUID || ''
            )}
            onSelect={handleSelectAnnotation}
            onAnnotationLabelChange={handleAnnotationLabelChange}
            onDelete={handleDeleteAnnotation}
          />
        ))}
    </Drawer>
  );
}

export default AnnotationDrawer;
