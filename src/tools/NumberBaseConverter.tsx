import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';

export function NumberBaseConverter() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [octal, setOctal] = useState('');
  const [hexadecimal, setHexadecimal] = useState('');

  const updateFromDecimal = (value: string) => {
    setDecimal(value);
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setBinary(num.toString(2));
      setOctal(num.toString(8));
      setHexadecimal(num.toString(16).toUpperCase());
    }
  };

  const updateFromBinary = (value: string) => {
    setBinary(value);
    const num = parseInt(value, 2);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setOctal(num.toString(8));
      setHexadecimal(num.toString(16).toUpperCase());
    }
  };

  const updateFromOctal = (value: string) => {
    setOctal(value);
    const num = parseInt(value, 8);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setBinary(num.toString(2));
      setHexadecimal(num.toString(16).toUpperCase());
    }
  };

  const updateFromHex = (value: string) => {
    setHexadecimal(value);
    const num = parseInt(value, 16);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setBinary(num.toString(2));
      setOctal(num.toString(8));
    }
  };

  return (
    <ToolLayout
      title="Number Base Converter"
      description="Convert between Binary, Octal, Decimal, and Hexadecimal"
      breadcrumbs={[{ label: 'Converters', href: '/category/converters' }]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Decimal (Base 10)</label>
          <input
            type="text"
            value={decimal}
            onChange={(e) => updateFromDecimal(e.target.value)}
            placeholder="42"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Binary (Base 2)</label>
          <input
            type="text"
            value={binary}
            onChange={(e) => updateFromBinary(e.target.value)}
            placeholder="101010"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Octal (Base 8)</label>
          <input
            type="text"
            value={octal}
            onChange={(e) => updateFromOctal(e.target.value)}
            placeholder="52"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Hexadecimal (Base 16)</label>
          <input
            type="text"
            value={hexadecimal}
            onChange={(e) => updateFromHex(e.target.value.toUpperCase())}
            placeholder="2A"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
