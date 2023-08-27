import { render } from '@testing-library/react';

import FrameRateControl from './FrameRateControl';

describe('FrameRateControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrameRateControl />);
    expect(baseElement).toBeTruthy();
  });
});
