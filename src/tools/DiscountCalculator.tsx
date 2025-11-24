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
