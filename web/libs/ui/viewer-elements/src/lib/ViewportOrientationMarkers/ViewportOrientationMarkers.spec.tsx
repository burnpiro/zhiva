import { render } from '@testing-library/react';

import ViewportOrientationMarkers from './ViewportOrientationMarkers';

describe('ViewportOrientationMarkers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewportOrientationMarkers />);
    expect(baseElement).toBeTruthy();
  });
});
