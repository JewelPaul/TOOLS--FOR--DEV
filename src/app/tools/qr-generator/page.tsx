'use client';

import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { ToolPageLayout, ToolCard, ToolSidebarInfo } from '@/components/tool-layout';

export default function QRGeneratorPage() {
  const [inputText, setInputText] = useState('https://toolsfordev.tech');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [size, setSize] = useState(300);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputText && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        inputText,
        {
          width: size,
          margin: 2,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) {
            console.error('Error generating QR code:', error);
            return;
          }
          
          // Also generate data URL for download
          QRCode.toDataURL(
            inputText,
            {
              width: size,
              margin: 2,
              errorCorrectionLevel: errorLevel,
            },
            (err, url) => {
              if (!err) {
                setQrDataUrl(url);
              }
            }
          );
        }
      );
    }
  }, [inputText, errorLevel, size]);

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <ToolPageLayout
      title="QR Code Generator"
      description="Generate customizable QR codes for URLs, text, contact information, and more"
      onDownload={handleDownload}
      sidebar={
        <ToolSidebarInfo>
          <p className="mb-2">
            QR codes are two-dimensional barcodes that can store various types of data. They're
            commonly used for:
          </p>
          <ul className="space-y-1 text-xs">
            <li>• Website URLs and links</li>
            <li>• Contact information (vCard)</li>
            <li>• WiFi credentials</li>
            <li>• Payment information</li>
            <li>• Plain text messages</li>
          </ul>
          <p className="mt-3 text-xs">
            <strong>Error Correction:</strong> Higher levels can restore more damaged data but
            result in denser QR codes.
          </p>
        </ToolSidebarInfo>
      }
    >
      {/* Configuration */}
      <ToolCard title="QR Code Settings">
        <div className="space-y-4">
          {/* Error Correction */}
          <div>
            <label className="mb-2 block text-sm font-medium">Error Correction Level</label>
            <div className="grid grid-cols-4 gap-2">
              {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setErrorLevel(level)}
                  className={`rounded-md border p-2 text-sm transition-colors ${
                    errorLevel === level
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'hover:bg-accent'
                  }`}
                >
                  {level}
                  <div className="mt-1 text-xs text-muted-foreground">
                    {level === 'L' && '~7%'}
                    {level === 'M' && '~15%'}
                    {level === 'Q' && '~25%'}
                    {level === 'H' && '~30%'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Size: {size}x{size}px
            </label>
            <input
              type="range"
              min="200"
              max="800"
              step="50"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </ToolCard>

      {/* Input */}
      <ToolCard title="Content">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter URL, text, or any content..."
          className="min-h-[120px] w-full rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-2 text-xs text-muted-foreground">
          Characters: {inputText.length}
        </div>
      </ToolCard>

      {/* QR Code Preview */}
      <ToolCard title="QR Code Preview">
        <div className="flex justify-center rounded-lg border bg-white p-8">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>
      </ToolCard>

      {/* Quick Templates */}
      <ToolCard title="Quick Templates">
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            onClick={() => setInputText('https://example.com')}
            className="rounded-md border p-3 text-left text-sm hover:bg-accent"
          >
            <div className="font-medium">Website URL</div>
            <div className="mt-1 text-xs text-muted-foreground">https://example.com</div>
          </button>
          <button
            onClick={() => setInputText('mailto:hello@example.com')}
            className="rounded-md border p-3 text-left text-sm hover:bg-accent"
          >
            <div className="font-medium">Email</div>
            <div className="mt-1 text-xs text-muted-foreground">mailto:hello@example.com</div>
          </button>
          <button
            onClick={() => setInputText('tel:+1234567890')}
            className="rounded-md border p-3 text-left text-sm hover:bg-accent"
          >
            <div className="font-medium">Phone Number</div>
            <div className="mt-1 text-xs text-muted-foreground">tel:+1234567890</div>
          </button>
          <button
            onClick={() => setInputText('WIFI:T:WPA;S:NetworkName;P:Password;;')}
            className="rounded-md border p-3 text-left text-sm hover:bg-accent"
          >
            <div className="font-medium">WiFi Network</div>
            <div className="mt-1 text-xs text-muted-foreground">WIFI:T:WPA;S:Name;P:Pass;;</div>
          </button>
        </div>
      </ToolCard>
    </ToolPageLayout>
  );
}
