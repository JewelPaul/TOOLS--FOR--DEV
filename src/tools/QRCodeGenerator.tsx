import { useState, useRef } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';

export function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownloadPNG = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) {
      toast.error('No QR code generated');
      return;
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.png';
        link.click();
        URL.revokeObjectURL(url);
        toast.success('QR code downloaded as PNG!');
      }
    });
  };

  const handleDownloadSVG = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) {
      toast.error('No QR code generated');
      return;
    }

    const svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
        <rect width="${size}" height="${size}" fill="${bgColor}"/>
        <image href="${canvas.toDataURL()}" width="${size}" height="${size}"/>
      </svg>
    `;

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.svg';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('QR code downloaded as SVG!');
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes with custom colors and download as PNG or SVG"
      breadcrumbs={[{ label: 'Marketing', href: '/category/marketing' }]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL to encode..."
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Foreground Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer rounded border border-slate-700"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer rounded border border-slate-700"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Size: {size}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <ActionButton onClick={handleDownloadPNG} disabled={!text} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </ActionButton>
            <ActionButton onClick={handleDownloadSVG} disabled={!text} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download SVG
            </ActionButton>
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 p-8">
          {text ? (
            <div ref={qrRef} className="rounded-lg bg-white p-4">
              <QRCodeCanvas
                value={text}
                size={Math.min(size, 400)}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H"
                includeMargin={false}
              />
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <div className="mb-2 text-4xl">📱</div>
              <p>Enter text to generate QR code</p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
