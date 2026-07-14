import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import AboutPage from './page';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('AboutPage', () => {
  it('renders main heading', () => {
    const { getByText } = render(<AboutPage />);

    expect(getByText('Swagger/OpenAPI UI')).toBeInTheDocument();
  });

  it('renders technology stack section', () => {
    const { getByText } = render(<AboutPage />);

    expect(getByText('Technology Stack')).toBeInTheDocument();
  });

  it('renders team section', () => {
    const { getByText } = render(<AboutPage />);

    expect(getByText('Our Team')).toBeInTheDocument();
    expect(getByText('Nataliya Krylova')).toBeInTheDocument();
    expect(getByText('Savely Kosevich')).toBeInTheDocument();
  });

  it('renders important external links', () => {
    const { getByText } = render(<AboutPage />);

    expect(getByText('RS School')).toBeInTheDocument();
    expect(getByText('React Course')).toBeInTheDocument();
    expect(getByText('Task link')).toBeInTheDocument();
  });

  it('renders GitHub links', () => {
    const { getAllByText } = render(<AboutPage />);

    const links = getAllByText('GitHub');

    expect(links).toHaveLength(3);

    expect(links[0]).toHaveAttribute('href', 'https://github.com/dzzuze');

    expect(links[1]).toHaveAttribute('href', 'https://github.com/NataliItaly');

    expect(links[2]).toHaveAttribute('href', 'https://github.com/Save1i');
  });
});
