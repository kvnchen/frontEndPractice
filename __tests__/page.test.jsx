import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page.js';

describe('Home', () => {
  it('renders a main', () => {
    render(<Home />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('has a select', () => {
    render(<Home />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });
});
