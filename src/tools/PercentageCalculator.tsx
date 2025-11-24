import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';

export function PercentageCalculator() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState('');

  const calculateXofY = () => {
    const x = parseFloat(value1);
    const y = parseFloat(value2);
    if (!isNaN(x) && !isNaN(y)) {
      setResult(`${(x * y / 100).toFixed(2)}`);
    }
  };

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentages in multiple modes"
      breadcrumbs={[{ label: 'Finance', href: '/category/finance' }]}
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter percentage"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter value"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <button
          onClick={calculateXofY}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          Calculate
        </button>
        {result && (
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-slate-100">{result}</div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
