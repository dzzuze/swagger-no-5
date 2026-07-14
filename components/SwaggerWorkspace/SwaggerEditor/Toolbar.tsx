import type { Format } from '@/types/swagger';
import type { SaveStatus } from '@/types/save';
import { Button } from '@/components/ui/button';

export type ToolbarProps = {
  format: Format;
  onConvertToJSON: () => void;
  onConvertToYAML: () => void;
  onSave: () => void;
  saveStatus: SaveStatus;
  isAuthenticated: boolean;
};

export default function Toolbar({
  format,
  onConvertToJSON,
  onConvertToYAML,
  onSave,
  saveStatus,
  isAuthenticated,
}: ToolbarProps) {
  return (
    <div className="mb-5 py-5">
      <Button
        className="px-5 py-3 cursor-pointer"
        variant={format === 'json' ? 'default' : 'outline'}
        onClick={onConvertToJSON}
        disabled={format === 'json'}
      >
        Convert to JSON
      </Button>
      <Button
        className="px-5 py-3 cursor-pointer"
        variant={format === 'yaml' ? 'default' : 'outline'}
        onClick={onConvertToYAML}
        disabled={format === 'yaml'}
      >
        Convert to YAML
      </Button>

      {isAuthenticated && (
        <Button
          className="px-5 py-3 cursor-pointer"
          variant="secondary"
          onClick={onSave}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'idle' && 'Save schema'}
          {saveStatus === 'saving' && 'Saving...'}
          {saveStatus === 'saved' && 'Saved ✓'}
          {saveStatus === 'error' && 'Save failed'}
        </Button>
      )}
    </div>
  );
}
