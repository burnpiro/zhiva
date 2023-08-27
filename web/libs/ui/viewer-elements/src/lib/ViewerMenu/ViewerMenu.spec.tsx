import { render } from '@testing-library/react';

import ViewerMenu from './ViewerMenu';

describe('ViewerMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewerMenu />);
    expect(baseElement).toBeTruthy();
  });
});
