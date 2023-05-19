import { render } from '@testing-library/react';

import PolygonIcon from './PolygonIcon';

describe('PolygonIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PolygonIcon />);
    expect(baseElement).toBeTruthy();
  });
});
