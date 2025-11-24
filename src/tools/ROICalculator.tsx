import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';

export function ROICalculator() {
  const [invested, setInvested] = useState('');
  const [returned, setReturned] = useState('');
  const [time, setTime] = useState('');

  const calculateROI = () => {
    const inv = parseFloat(invested);
    const ret = parseFloat(returned);
    if (!isNaN(inv) && !isNaN(ret) && inv > 0) {
      return ((ret - inv) / inv * 100).toFixed(2);
    }
    return '0.00';
  };

  const annualizedROI = () => {
    const roi = parseFloat(calculateROI());
    const t = parseFloat(time);
    if (!isNaN(t) && t > 0) {
      return (roi / t).toFixed(2);
    }
    return calculateROI();
  };

  return (
    <ToolLayout
      title="ROI Calculator"
      description="Calculate Return on Investment percentage"
      breadcrumbs={[{ label: 'Finance', href: '/category/finance' }]}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Amount Invested</label>
            <input
              type="number"
              value={invested}
              onChange={(e) => setInvested(e.target.value)}
              placeholder="10000"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Amount Returned</label>
            <input
              type="number"
              value={returned}
              onChange={(e) => setReturned(e.target.value)}
              placeholder="15000"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Time (years)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="2"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-2 text-sm text-slate-400">Total ROI</div>
            <div className="text-4xl font-bold text-green-400">{calculateROI()}%</div>
            <div className="mt-2 text-sm text-slate-400">
              Gain/Loss: ${(parseFloat(returned) - parseFloat(invested) || 0).toFixed(2)}
            </div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-2 text-sm text-slate-400">Annualized ROI</div>
            <div className="text-4xl font-bold text-indigo-400">{annualizedROI()}%</div>
            <div className="mt-2 text-sm text-slate-400">
              Per year over {time || '1'} year(s)
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
