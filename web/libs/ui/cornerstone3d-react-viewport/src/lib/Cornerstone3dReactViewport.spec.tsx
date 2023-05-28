import { render } from '@testing-library/react';

import Cornerstone3dReactViewport from './Cornerstone3dReactViewport';

describe('Cornerstone3dReactViewport', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cornerstone3dReactViewport />);
    expect(baseElement).toBeTruthy();
  });
});
