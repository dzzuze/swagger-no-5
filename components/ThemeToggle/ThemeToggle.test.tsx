import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

const setTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
    setTheme,
  }),
}));

vi.mock('lucide-react', () => ({
  Moon: () => <svg data-testid="moon" />,
  Sun: () => <svg data-testid="sun" />,
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    setTheme.mockClear();
  });

  it('renders after mounting', async () => {
    const { findByTestId } = render(<ThemeToggle />);

    expect(await findByTestId('moon')).toBeInTheDocument();
  });
});
