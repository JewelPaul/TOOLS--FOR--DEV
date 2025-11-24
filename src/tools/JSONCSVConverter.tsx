import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { toast } from 'sonner';

export function JSONCSVConverter() {
  const [jsonInput, setJsonInput] = useState('');
  const [csvInput, setCsvInput] = useState('');

  const jsonToCSV = () => {
    try {
      const data = JSON.parse(jsonInput);
      if (!Array.isArray(data) || data.length === 0) {
        toast.error('JSON must be an array of objects');
        return;
      }
      const headers = Object.keys(data[0]);
      const csv = [
        headers.join(','),
        ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
      ].join('\n');
      setCsvInput(csv);
      toast.success('Converted to CSV!');
    } catch {
      toast.error('Invalid JSON');
    }
  };

  return (
    <ToolLayout
      title="JSON ↔ CSV Converter"
      description="Convert JSON arrays to CSV and vice versa"
      breadcrumbs={[{ label: 'Converters', href: '/category/converters' }]}
    >
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">JSON</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[{"name": "John", "age": 30}]'
              rows={15}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">CSV</label>
            <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="name,age"
              rows={15}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
        <ActionButton onClick={jsonToCSV}>Convert JSON to CSV</ActionButton>
      </div>
    </ToolLayout>
  );
}
