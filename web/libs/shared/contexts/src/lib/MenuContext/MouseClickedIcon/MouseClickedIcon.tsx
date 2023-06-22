import { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';
import {MouseButtonTypes} from "@zhiva/utils";

/* eslint-disable-next-line */
export interface MouseClickedIconProps extends SvgIconProps {
  side?: MouseButtonTypes;
}

export function MouseClickedIcon(props: MouseClickedIconProps) {
  const { side = 'none', color  } = props;

  const clickedStyles = {
    strokeWidth: 1.16999996,
    strokeLinejoin: 'round',
    paintOrder: 'normal',
    stroke: color === 'disabled' ? 'gray' : 'white',
    fillOpacity: 1,
    fill: '#000',
  };

  const unClickedStyles = {
    strokeWidth: 0.89999998,
    stroke: color === 'disabled' ? 'gray' : 'white',
    paintOrder: 'normal',
  };

  return (
    <SvgIcon {...props}>
      <g id="g12" stroke="#000">
        <g transform="translate(0.03595458,0.53931871)" id="g4769">
          <g id="g8566">
            <g id="g8548">
              <path
                id="path4"
                d="m 4.8,14.703171 c -0.061742,3.260775 2.3864512,6.334651 5.57349,7.015709 3.064957,0.761861 6.496414,-0.784101 7.957821,-3.583075 0.806292,-1.379136 0.915159,-2.995411 0.868689,-4.554158 0,-0.826158 0,-1.652317 0,-2.478476 -4.8,0 -9.6,0 -14.4,0 0,1.2 0,2.4 0,3.6 z"
                style={{
                  strokeWidth: 0,
                  stroke: 'white',
                }}
              />
              <path
                id="path8"
                d="M 4.335346,8.5020169 C 4.3668608,5.5749254 6.3352212,2.7838846 9.1122796,1.8280266 9.5225313,1.8166337 10.680958,1.0794568 10.677655,1.7054063 c 0,2.3059802 0,4.6119604 0,6.9179406 -2.11413,0 -4.22826,0 -6.34239,0 2.7e-5,-0.040443 5.4e-5,-0.080887 8.1e-5,-0.12133 z"
                style={side === 'left' ? clickedStyles : unClickedStyles}
              />
              <path
                id="path10"
                d="m 13.358774,5.0278589 c 0,-1.18623 0,-2.37246 0,-3.55869 2.676774,0.3294649 5.061287,2.2641006 5.899542,4.8312346 0.264541,0.732918 0.357156,1.5117018 0.387969,2.2862064 -2.09583,0 -4.19166,0 -6.28749,0 -7e-6,-1.1862503 -1.4e-5,-2.3725007 -2.1e-5,-3.558751 z"
                style={side === 'right' ? clickedStyles : unClickedStyles}
              />
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
}

export default MouseClickedIcon;
