import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Types as CSToolsTypes } from '@cornerstonejs/tools';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { CornerstoneToolNames, ToolDisplayNames } from '@zhiva/utils';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { Fragment, useEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';


const AnnotationListItem = styled(ListItem)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
    },
  })
);

interface ToolMetadataDisplayProps {
  toolName: string;
  data: CSToolsTypes.Annotation['data'];
  onLabelChange: (newLabel: string) => void;
}

function ToolMetadataDisplay({
  toolName,
  data,
  onLabelChange,
}: ToolMetadataDisplayProps) {
  const [label, setLabel] = useState<string>(data['text']);
  const [selected, setSelected] = useState<boolean>(false);

  const updateInputLabelThrottled = throttle(
    (newLabel: string) => {
      onLabelChange(newLabel);
    },
    200,
    { trailing: true, leading: false }
  );

  useEffect(() => {
    if (data['text'] !== label && data['text'] != null && !selected) {
      setLabel(data['text']);
    }
  }, [data['text']]);

  useEffect(() => {
    if (data['text'] !== label && label != null) {
      updateInputLabelThrottled(label);
    }
  }, [label]);

  const onChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setLabel(event.target.value);
  };

  const preventTextClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleFocus = () => {
    setSelected(true);
  };

  const handleBlur = () => {
    // Delay this because CS sometimes take a while to trigger update event nad `data` comes after update so the previous data is used and replaces `label` with old value
    setTimeout(() => setSelected(false), 500);
  };

  const annotationData =
    data.cachedStats != null
      ? Array.isArray(data.cachedStats)
        ? data.cachedStats
        : typeof data.cachedStats === 'object'
        ? Object.values(data.cachedStats)[0]
        : {}
      : {} || {};
  switch (toolName) {
    case CornerstoneToolNames.RectangleROI:
      return (
        <ListItemText
          primary={
            <Input
              placeholder="Label"
              value={label || ''}
              onClick={preventTextClick}
              onChange={onChangeLabel}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          }
          secondaryTypographyProps={{
            component: 'div',
          }}
          secondary={
            <Fragment>
              <Typography
                variant="caption"
                sx={{ mt: 1, mb: 1 }}
                component="div"
              >
                {`Area: ${Math.abs(Number(annotationData['area'])).toFixed(
                  3
                )} ${annotationData['areaUnit']}²`}
                <br />
                {`Mean: ${annotationData['mean'].toFixed(3)}`}
                <br />
                {`Max: ${annotationData['max'].toFixed(3)}`}
                <br />
                {`stdDev: ${annotationData['stdDev'].toFixed(3)}`}
              </Typography>
              <Typography
                color="text.secondary"
                variant="caption"
                component="span"
              >
                {ToolDisplayNames[CornerstoneToolNames.RectangleROI]}
              </Typography>
            </Fragment>
          }
        />
      );
    case CornerstoneToolNames.Length:
      return (
        <ListItemText
          primary={
            <Input
              placeholder="Label"
              value={label || ''}
              onClick={preventTextClick}
              onChange={onChangeLabel}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          }
          secondaryTypographyProps={{
            component: 'div',
          }}
          secondary={
            <Fragment>
              <Typography
                variant="caption"
                sx={{ pt: 1, pb: 1 }}
                component="div"
              >
                {`Length: ${Math.abs(Number(annotationData['length'])).toFixed(
                  3
                )} ${annotationData['unit']}`}
              </Typography>
              <Typography
                color="text.secondary"
                variant="caption"
                component="span"
              >
                {ToolDisplayNames[CornerstoneToolNames.Length]}
              </Typography>
            </Fragment>
          }
        />
      );
    default:
      return (
        <ListItemText
          primary={
            <Input
              placeholder="Label"
              value={label || ''}
              onClick={preventTextClick}
              onChange={onChangeLabel}
            />
          }
          secondaryTypographyProps={{
            component: 'div',
          }}
          secondary={
            <Typography
              color="text.secondary"
              variant="caption"
              sx={{ pt: 1 }}
              component="div"
            >
              {ToolDisplayNames[toolName as keyof typeof ToolDisplayNames] ||
                toolName}
            </Typography>
          }
        />
      );
  }
}


export interface AnnotationDisplayProps {
  annotation: CSToolsTypes.Annotation;
  isVisible: boolean;
  isSelected: boolean;
  onSelect: (annotationId: string) => void;
  onVisibilityChange?: (annotationId: string, checked: boolean) => void;
  onAnnotationLabelChange: (annotationId: string, label: string) => void;
  onDelete?: (annotationId: string) => void;
}

export function AnnotationDisplay({
  annotation,
  isVisible,
  isSelected,
  onSelect,
  onVisibilityChange,
  onAnnotationLabelChange,
  onDelete,
}: AnnotationDisplayProps) {
  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    event.stopPropagation();
    if (onVisibilityChange && annotation.annotationUID) {
      onVisibilityChange(annotation.annotationUID, checked);
    }
  };

  const onAnnotationSelect = () => {
    if (annotation.annotationUID) {
      onSelect(annotation.annotationUID);
    }
  };

  const handleLabelChange = (newLabel: string) => {
    if (annotation.annotationUID) {
      onAnnotationLabelChange(annotation.annotationUID, newLabel);
    }
  };

  const handleDeleteAnnotation = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    console.log('delete');
    if (onDelete && annotation.annotationUID) {
      onDelete(annotation.annotationUID);
    }
  };

  return (
    <AnnotationListItem
      selected={isSelected}
      secondaryAction={
        <Stack>
          {
            onVisibilityChange && <Checkbox
              edge="end"
              value={annotation.annotationUID}
              onChange={handleVisibilityChange}
              checked={isVisible}
              sx={{ mb: 2 }}
            />
          }
          {onDelete && (
            <IconButton
              edge="end"
              aria-label="delete annotation"
              onClick={handleDeleteAnnotation}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
      }
    >
      <ListItemButton
        onClick={onAnnotationSelect}
        sx={{ pr: 0, pl: 1 }}
        dense
        disableGutters
      >
        <ToolMetadataDisplay
          toolName={annotation.metadata.toolName}
          data={annotation.data}
          onLabelChange={handleLabelChange}
        />
      </ListItemButton>
    </AnnotationListItem>
  );
}

export default AnnotationDisplay;
