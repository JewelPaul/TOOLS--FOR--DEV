#!/bin/bash

# JSON CSV Converter
cat > JSONCSVConverter.tsx << 'EOF'
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
    } catch (error) {
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
EOF

# Percentage Calculator
cat > PercentageCalculator.tsx << 'EOF'
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
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
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
EOF

# Discount Calculator
cat > DiscountCalculator.tsx << 'EOF'
import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';

export function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');

  const finalPrice = () => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    const t = parseFloat(tax) || 0;
    const afterDiscount = p - (p * d / 100);
    return afterDiscount + (afterDiscount * t / 100);
  };

  const savings = () => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    return p * d / 100;
  };

  return (
    <ToolLayout
      title="Discount Calculator"
      description="Calculate final price with discount and tax"
      breadcrumbs={[{ label: 'Finance', href: '/category/finance' }]}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Original Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="100"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Discount (%)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="20"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Tax (%)</label>
          <input
            type="number"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            placeholder="10"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-sm text-slate-400">Final Price</div>
            <div className="text-2xl font-bold text-green-400">${finalPrice().toFixed(2)}</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-sm text-slate-400">You Save</div>
            <div className="text-2xl font-bold text-indigo-400">${savings().toFixed(2)}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
EOF

echo "Created 3 more tools"
