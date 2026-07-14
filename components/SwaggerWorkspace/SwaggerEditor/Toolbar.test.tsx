import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import Toolbar from './Toolbar';

describe('Toolbar', () => {
  it('renders convert buttons', () => {
    const { getByText } = render(
      <Toolbar
        format="json"
        onConvertToJSON={vi.fn()}
        onConvertToYAML={vi.fn()}
        onSave={vi.fn()}
        saveStatus="idle"
        isAuthenticated={false}
      />,
    );

    expect(getByText('Convert to JSON')).toBeInTheDocument();
    expect(getByText('Convert to YAML')).toBeInTheDocument();
  });

  it('calls onConvertToJSON', () => {
    const onJson = vi.fn();

    const { getByText } = render(
      <Toolbar
        format="yaml"
        onConvertToJSON={onJson}
        onConvertToYAML={vi.fn()}
        onSave={vi.fn()}
        saveStatus="idle"
        isAuthenticated={false}
      />,
    );

    fireEvent.click(getByText('Convert to JSON'));

    expect(onJson).toHaveBeenCalledTimes(1);
  });

  it('calls onConvertToYAML', () => {
    const onYaml = vi.fn();

    const { getByText } = render(
      <Toolbar
        format="json"
        onConvertToJSON={vi.fn()}
        onConvertToYAML={onYaml}
        onSave={vi.fn()}
        saveStatus="idle"
        isAuthenticated={false}
      />,
    );

    fireEvent.click(getByText('Convert to YAML'));

    expect(onYaml).toHaveBeenCalledTimes(1);
  });

  it('does not render save button for unauthenticated user', () => {
    const { queryByText } = render(
      <Toolbar
        format="json"
        onConvertToJSON={vi.fn()}
        onConvertToYAML={vi.fn()}
        onSave={vi.fn()}
        saveStatus="idle"
        isAuthenticated={false}
      />,
    );

    expect(queryByText('Save schema')).toBeNull();
  });

  it('renders save button for authenticated user', () => {
    const { getByText } = render(
      <Toolbar
        format="json"
        onConvertToJSON={vi.fn()}
        onConvertToYAML={vi.fn()}
        onSave={vi.fn()}
        saveStatus="idle"
        isAuthenticated
      />,
    );

    expect(getByText('Save schema')).toBeInTheDocument();
  });

  it('calls onSave', () => {
    const onSave = vi.fn();

    const { getByText } = render(
      <Toolbar
        format="json"
        onConvertToJSON={vi.fn()}
        onConvertToYAML={vi.fn()}
        onSave={onSave}
        saveStatus="idle"
        isAuthenticated
      />,
    );

    fireEvent.click(getByText('Save schema'));

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('shows saving status', () => {
    const { getByText } = render(
      <Toolbar
        format="json"
        onConvertToJSON={vi.fn()}
        onConvertToYAML={vi.fn()}
        onSave={vi.fn()}
        saveStatus="saving"
        isAuthenticated
      />,
    );

    expect(getByText('Saving...')).toBeInTheDocument();
  });

  it('shows saved status', () => {
    const { getByText } = render(
      <Toolbar
        format="json"
        onConvertToJSON={vi.fn()}
        onConvertToYAML={vi.fn()}
        onSave={vi.fn()}
        saveStatus="saved"
        isAuthenticated
      />,
    );

    expect(getByText('Saved ✓')).toBeInTheDocument();
  });

  it('shows error status', () => {
    const { getByText } = render(
      <Toolbar
        format="json"
        onConvertToJSON={vi.fn()}
        onConvertToYAML={vi.fn()}
        onSave={vi.fn()}
        saveStatus="error"
        isAuthenticated
      />,
    );

    expect(getByText('Save failed')).toBeInTheDocument();
  });
});
