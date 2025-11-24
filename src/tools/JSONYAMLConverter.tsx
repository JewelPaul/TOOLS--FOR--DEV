import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { ArrowRightLeft } from 'lucide-react';
import { toast } from 'sonner';
import yaml from 'js-yaml';

export function JSONYAMLConverter() {
  const [jsonInput, setJsonInput] = useState('');
  const [yamlInput, setYamlInput] = useState('');
  const [mode, setMode] = useState<'json-to-yaml' | 'yaml-to-json'>('json-to-yaml');

  const convertJSONtoYAML = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const yamlStr = yaml.dump(parsed);
      setYamlInput(yamlStr);
      toast.success('Converted to YAML!');
    } catch {
      toast.error('Invalid JSON');
    }
  };

  const convertYAMLtoJSON = () => {
    try {
      const parsed = yaml.load(yamlInput);
      const jsonStr = JSON.stringify(parsed, null, 2);
      setJsonInput(jsonStr);
      toast.success('Converted to JSON!');
    } catch {
      toast.error('Invalid YAML');
    }
  };

  return (
    <ToolLayout
      title="JSON ↔ YAML Converter"
      description="Convert between JSON and YAML formats"
      breadcrumbs={[{ label: 'Converters', href: '/category/converters' }]}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <ActionButton
            onClick={() => setMode('json-to-yaml')}
            variant={mode === 'json-to-yaml' ? 'primary' : 'outline'}
          >
            JSON → YAML
          </ActionButton>
          <ActionButton
            onClick={() => setMode('yaml-to-json')}
            variant={mode === 'yaml-to-json' ? 'primary' : 'outline'}
          >
            YAML → JSON
          </ActionButton>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">JSON</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"key": "value"}'
              rows={15}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">YAML</label>
            <textarea
              value={yamlInput}
              onChange={(e) => setYamlInput(e.target.value)}
              placeholder="key: value"
              rows={15}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <ActionButton
            onClick={mode === 'json-to-yaml' ? convertJSONtoYAML : convertYAMLtoJSON}
          >
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Convert
          </ActionButton>
        </div>
      </div>
    </ToolLayout>
  );
}
