import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function ColorConverter() {
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbR, setRgbR] = useState(59);
  const [rgbG, setRgbG] = useState(130);
  const [rgbB, setRgbB] = useState(246);

  const updateFromHex = (hex: string) => {
    setHexInput(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbR(rgb.r);
      setRgbG(rgb.g);
      setRgbB(rgb.b);
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgbR(r);
    setRgbG(g);
    setRgbB(b);
    setHexInput(rgbToHex(r, g, b));
  };

  const hsl = rgbToHsl(rgbR, rgbG, rgbB);
  const rgbString = `rgb(${rgbR}, ${rgbG}, ${rgbB})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  
  // Simple CMYK conversion (not perfect but good enough)
  const cmykK = 1 - Math.max(rgbR / 255, rgbG / 255, rgbB / 255);
  const cmykC = cmykK === 1 ? 0 : Math.round((1 - rgbR / 255 - cmykK) / (1 - cmykK) * 100);
  const cmykM = cmykK === 1 ? 0 : Math.round((1 - rgbG / 255 - cmykK) / (1 - cmykK) * 100);
  const cmykY = cmykK === 1 ? 0 : Math.round((1 - rgbB / 255 - cmykK) / (1 - cmykK) * 100);
  const cmykString = `cmyk(${cmykC}%, ${cmykM}%, ${cmykY}%, ${Math.round(cmykK * 100)}%)`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert between HEX, RGB, HSL, and CMYK color formats"
      breadcrumbs={[{ label: 'Converters', href: '/category/converters' }]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">HEX</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hexInput}
                onChange={(e) => updateFromHex(e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <input
                type="color"
                value={hexInput}
                onChange={(e) => updateFromHex(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border border-slate-700"
              />
              <ActionButton size="sm" onClick={() => copyToClipboard(hexInput, 'HEX')}>
                <Copy className="h-4 w-4" />
              </ActionButton>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">RGB</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min="0"
                max="255"
                value={rgbR}
                onChange={(e) => updateFromRgb(Number(e.target.value), rgbG, rgbB)}
                placeholder="R"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rgbG}
                onChange={(e) => updateFromRgb(rgbR, Number(e.target.value), rgbB)}
                placeholder="G"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rgbB}
                onChange={(e) => updateFromRgb(rgbR, rgbG, Number(e.target.value))}
                placeholder="B"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-slate-400">{rgbString}</span>
              <ActionButton size="sm" onClick={() => copyToClipboard(rgbString, 'RGB')}>
                <Copy className="h-4 w-4" />
              </ActionButton>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">HSL</label>
            <div className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-100">{hslString}</span>
                <ActionButton size="sm" onClick={() => copyToClipboard(hslString, 'HSL')}>
                  <Copy className="h-4 w-4" />
                </ActionButton>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">CMYK</label>
            <div className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-100">{cmykString}</span>
                <ActionButton size="sm" onClick={() => copyToClipboard(cmykString, 'CMYK')}>
                  <Copy className="h-4 w-4" />
                </ActionButton>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex items-center justify-center">
          <div className="w-full space-y-4">
            <div
              className="h-64 w-full rounded-lg border-2 border-slate-700 shadow-xl"
              style={{ backgroundColor: hexInput }}
            />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="text-sm text-slate-400">HEX</div>
                <div className="mt-1 font-mono text-lg text-slate-100">{hexInput}</div>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="text-sm text-slate-400">RGB</div>
                <div className="mt-1 font-mono text-lg text-slate-100">
                  {rgbR}, {rgbG}, {rgbB}
                </div>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="text-sm text-slate-400">HSL</div>
                <div className="mt-1 font-mono text-lg text-slate-100">
                  {hsl.h}°, {hsl.s}%, {hsl.l}%
                </div>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="text-sm text-slate-400">CMYK</div>
                <div className="mt-1 font-mono text-sm text-slate-100">
                  {cmykC}, {cmykM}, {cmykY}, {Math.round(cmykK * 100)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
