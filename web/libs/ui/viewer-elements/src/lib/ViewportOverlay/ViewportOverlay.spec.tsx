import { render } from '@testing-library/react';

import ViewportOverlay from './ViewportOverlay';

describe('ViewportOverlay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewportOverlay />);
    expect(baseElement).toBeTruthy();
  });
});
