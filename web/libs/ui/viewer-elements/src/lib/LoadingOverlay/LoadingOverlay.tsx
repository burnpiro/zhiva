import { styled } from '@mui/material/styles';

const PREFIX = 'LoadingOverlay';

const classes = {
  loadingIndicator: `${PREFIX}-loadingIndicator`,
  indicatorContents: `${PREFIX}-indicatorContents`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.loadingIndicator}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    fontSize: '18px',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  [`& .${classes.indicatorContents}`]: {
    fontWeight: 300,
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
  },

  ['.description']: {
    fontSize: '14px'
  },
  ['.details']: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
}));

/* eslint-disable-next-line */
export interface LoadingOverlayProps {
  percentComplete: number;
  error?: string;
}

export function LoadingOverlay({
  error,
  percentComplete,
}: LoadingOverlayProps) {
  return (
    <>
      {error != null ? (
        <Root className={classes.loadingIndicator}>
          <div className={classes.indicatorContents}>
            <h4>Error</h4>
            <p className="description">An error has occurred.</p>
            <p className="details">{error}</p>
          </div>
        </Root>
      ) : (
        <Root className={classes.loadingIndicator}>
          <div className={classes.indicatorContents}>
            <h2>
              {'Loading...'}
              <i className="fa fa-spin fa-circle-o-notch fa-fw" />{' '}
            </h2>
            {percentComplete === 100 && <p>Processing...</p>}
          </div>
        </Root>
      )}
    </>
  );
}

export default LoadingOverlay;
