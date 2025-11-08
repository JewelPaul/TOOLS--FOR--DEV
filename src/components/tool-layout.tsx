'use client';

import { ReactNode } from 'react';
import { Copy, Download, Info } from 'lucide-react';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  sidebar?: ReactNode;
  onCopy?: () => void;
  onDownload?: () => void;
  showActions?: boolean;
}

export function ToolPageLayout({
  title,
  description,
  children,
  sidebar,
  onCopy,
  onDownload,
  showActions = true,
}: ToolPageLayoutProps) {
  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
        {/* Tool Area */}
        <div className="space-y-6">
          {children}

          {/* Action Buttons */}
          {showActions && (
            <div className="flex gap-3">
              {onCopy && (
                <button
                  onClick={onCopy}
                  className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Copy className="h-4 w-4" />
                  Copy Result
                </button>
              )}
              {onDownload && (
                <button
                  onClick={onDownload}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        {sidebar && (
          <div className="space-y-6">
            {sidebar}
          </div>
        )}
      </div>
    </div>
  );
}

interface ToolCardProps {
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function ToolCard({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
}: ToolCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

export function ToolSidebarInfo({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
        <Info className="h-4 w-4" />
        <span>How it works</span>
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
