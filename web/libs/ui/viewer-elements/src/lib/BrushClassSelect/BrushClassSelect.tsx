import { BrushColorClass } from '@zhiva/utils';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Segmentation } from '@zhiva/services';
import { useState, MouseEvent } from 'react';

export interface BrushClassSelectProps {
  classes: BrushColorClass[];
  segmentations: Segmentation[];
  activeClasses: string[];
  selectedSegmentations: string[];
  onSegmentationSelect: (segmentationId: Segmentation['id']) => void;
  onActiveChange: (
    segmentationId: Segmentation['id'],
    checked: boolean
  ) => void;
  onChangeSegmentationBrushClass: (
    segmentationId: Segmentation['id'],
    classId: BrushColorClass['classId']
  ) => void;
}

const BrushListItem = styled(ListItem)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
    },
  })
);

export function BrushClassSelect({
  classes,
  segmentations,
  activeClasses,
  selectedSegmentations,
  onSegmentationSelect,
  onActiveChange,
  onChangeSegmentationBrushClass,
}: BrushClassSelectProps) {
  const [brushAnchorEl, setBrushAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(brushAnchorEl);
  console.log(brushAnchorEl);
  const handleOpenSelectBrushClass = (event: MouseEvent<HTMLDivElement>) => {
    setBrushAnchorEl(event.currentTarget);
  };
  const handleCloseSelectBrushClass = () => {
    setBrushAnchorEl(null);
  };

  const handleClick = (id: Segmentation['id']) => {
    onSegmentationSelect(id);
  };
  const handleActiveClassChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.value;
    const checked = event.target.checked;
    event.stopPropagation();
    onActiveChange(id, checked);
  };

  const handleBrushClassChange = (
    segId: Segmentation['id'],
    classId: BrushColorClass['classId']
  ) => {
    onChangeSegmentationBrushClass(segId, classId);
    console.log(segId, classId);
    handleCloseSelectBrushClass();
  };
  const selectedSegId = brushAnchorEl?.dataset['segid'];
  console.log(selectedSegId);

  return (
    <List aria-label="Classes" sx={{ bgcolor: 'background.paper' }}>
      {segmentations.map(({ id, colorLUTIndex, label }) => {
        const selectedBrushClass = classes.find(
          (el) => el.activeLabelmapIndex === colorLUTIndex
        );
        const color = selectedBrushClass?.color || [0, 0, 0, 0];
        return (
          <BrushListItem
            key={id}
            selected={selectedSegmentations.includes(id)}
            secondaryAction={
              <Checkbox
                edge="end"
                value={id}
                onChange={handleActiveClassChange}
                checked={activeClasses.indexOf(id) !== -1}
                inputProps={{ 'aria-labelledby': label }}
              />
            }
          >
            <ListItemButton
              onClick={() => handleClick(id)}
              sx={{ pr: 0, pl: 0 }}
              dense
              disableGutters
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: 1 }}
                id={`selected-brush-${id}`}
                aria-controls={open ? 'select-brush-class' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleOpenSelectBrushClass}
                data-segid={id}
              >
                <CircleIcon
                  fontSize={'medium'}
                  sx={{ color: `rgb(${color[0]},${color[1]},${color[2]})` }}
                />
              </ListItemIcon>
              <ListItemText
                primary={label}
                secondary={selectedBrushClass?.name || ''}
              />{' '}
            </ListItemButton>
            {selectedSegId === id && (
              <Menu
                id={`brush-menu-${id}`}
                anchorEl={brushAnchorEl}
                open={open}
                onClose={handleCloseSelectBrushClass}
                MenuListProps={{
                  'aria-labelledby': 'select-brush-class',
                }}
              >
                {classes.map(({ name, color: classColor, classId }) => (
                  <MenuItem
                    onClick={() => handleBrushClassChange(id, classId)}
                    key={classId}
                  >
                    <CircleIcon
                      fontSize={'medium'}
                      sx={{
                        color: `rgb(${classColor[0]},${classColor[1]},${classColor[2]})`,
                      }}
                    />
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </BrushListItem>
        );
      })}
      {segmentations.length === 0 && (
        <Typography sx={{ p: 2 }} variant={'body1'}>
          No segmentation available
        </Typography>
      )}
    </List>
  );
}

export default BrushClassSelect;
