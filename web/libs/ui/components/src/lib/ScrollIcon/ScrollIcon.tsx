import { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

export interface ScrollIconProps extends SvgIconProps {}

export function ScrollIcon(props: ScrollIconProps) {
  return (
    <SvgIcon {...props}>
      <g id="g4890">
        <path d="M 24,0 V 24 H 0 V 0 Z" id="path4832" style={{ fill: 'none' }} />
        <path
          d="M 17.24,7.77 18.52,6.23 12,0.82 5.48,6.23 6.76,7.77 12,3.42 Z m 1.28,10 L 17.24,16.23 12,20.58 6.76,16.23 5.48,17.77 12,23.18 Z"
          id="path4834"
        />
        <g style={{ fill: 'none' }} id="g4858" transform="matrix(0.49576271,0,0,0.49576271,6.1016948,6.1016952)">
          <path id="path4844" d="M 0,0 H 24 V 24 H 0 Z" style={{ fill: 'none' }} />
          <path
            id="path4846"
            style={{ fill: 'currentcolor' }}
            d="M 0.33333332,13.358975 H 23.871795 V 10.74359 H 0.33333332 Z m 0,5.230769 H 23.871795 V 15.974359 H 0.33333332 Z m 0,-10.4615389 H 23.871795 V 5.5128205 H 0.33333332 Z"
          />
        </g>
      </g>
    </SvgIcon>
  );
}

export default ScrollIcon;
