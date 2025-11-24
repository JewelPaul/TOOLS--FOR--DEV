import { ToolLayout } from '../layouts/ToolLayout';

interface ToolPlaceholderProps {
  title: string;
  description: string;
}

export function ToolPlaceholder({ title, description }: ToolPlaceholderProps) {
  return (
    <ToolLayout title={title} description={description}>
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="mb-4 text-6xl">🚧</div>
        <h3 className="mb-2 text-xl font-semibold text-slate-100">Tool Under Construction</h3>
        <p className="text-slate-400">
          This tool is currently being implemented. Check back soon!
        </p>
      </div>
    </ToolLayout>
  );
}
