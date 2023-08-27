import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { styled } from '@mui/material/styles';

import { IconButton, SelectChangeEvent } from '@zhiva/ui-components';
import { ToolButton } from '@zhiva/viewer-elements';
import { MenuItems, ToolDisplayNames } from '@zhiva/utils';

import FrameRateSelect from './FrameRateSelect';

const ControlContainer = styled(Paper)(({ theme }) => ({
  width: 0,
  minWidth: 0,
  maxHeight: 48,
  display: 'block',
  overflow: 'hidden',
  transition: theme.transitions.create(['min-width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.standard,
  }),
  [`&.isOpen`]: {
    minWidth: 190,
  },
}));

interface FrameRateControlProps {
  disabled?: boolean;
  disablePlay?: boolean;
  isPlaying: boolean;
  frameRate: number;
  onFrameRateChange: (newFrameRate: number) => void;
  onIsPlayingChange: (isPlaying: boolean) => void;
  onResetFrames: () => void;
}

export function FrameRateControl({
  disabled,
  disablePlay,
  isPlaying,
  frameRate,
  onFrameRateChange,
  onIsPlayingChange,
  onResetFrames,
}: FrameRateControlProps) {
  const [playButtonsVisible, setPlayButtonsVisible] = useState(false);

  const togglePlayButtons = () => {
    setPlayButtonsVisible(!playButtonsVisible);
  };

  const togglePlaying = () => {
    onIsPlayingChange(!isPlaying);
  };

  const setFrameToZero = () => {
    onResetFrames();
    onIsPlayingChange(false);
  };

  const handleFrameRateChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;
    onFrameRateChange(Number(value));
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row' }}
      aria-label="Frame Rate Button Group"
    >
      <ControlContainer
        className={playButtonsVisible ? 'isOpen' : undefined}
        variant={'outlined'}
        aria-label="Frame Rate Controls"
      >
        <IconButton onClick={setFrameToZero} size="large">
          <SkipPreviousIcon fontSize={'medium'} />
        </IconButton>
        <IconButton onClick={togglePlaying} size="large" disabled={disablePlay}>
          {isPlaying && <PauseIcon fontSize={'medium'} />}
          {!isPlaying && <PlayArrowIcon fontSize={'medium'} />}
        </IconButton>
        <FrameRateSelect
          selectedValue={frameRate}
          values={[1, 5, 10, 15, 20, 25, 30, 60]}
          onChange={handleFrameRateChange}
        />
      </ControlContainer>
      <ToolButton
        name={ToolDisplayNames[MenuItems.PlayTools]}
        isActive={true}
        disabled={disabled}
        onClick={togglePlayButtons}
        size={'large'}
        customIcon={<PlayCircleOutlineIcon />}
      />
    </Box>
  );
}

export default FrameRateControl;
