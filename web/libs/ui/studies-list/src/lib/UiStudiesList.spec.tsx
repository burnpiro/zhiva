import { render } from '@testing-library/react';

import UiStudiesList from './UiStudiesList';

describe('UiStudiesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiStudiesList />);
    expect(baseElement).toBeTruthy();
  });
});
