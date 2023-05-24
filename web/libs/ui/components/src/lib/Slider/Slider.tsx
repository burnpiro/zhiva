import { default as MUISlider } from '@mui/material/Slider';
export * from '@mui/material/Slider';

import type { SliderProps as MUISliderProps } from '@mui/material/Slider';

/* eslint-disable-next-line */
export interface SliderProps extends MUISliderProps {}

export function Slider(props: SliderProps) {
  return <MUISlider {...props} />;
}

export default Slider;
