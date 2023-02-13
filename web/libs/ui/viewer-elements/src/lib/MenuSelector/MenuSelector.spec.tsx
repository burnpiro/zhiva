import { render } from '@testing-library/react';

import MenuSelector from './MenuSelector';

describe('MenuSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MenuSelector />);
    expect(baseElement).toBeTruthy();
  });
});
