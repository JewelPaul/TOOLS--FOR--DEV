import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '../utils/cn';

interface DragDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  className?: string;
}

export function DragDropZone({
  onFilesSelected,
  accept = '*',
  multiple = false,
  maxSize = 10,
  className,
}: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return null;

      const fileArray = Array.from(files);
      const maxSizeBytes = maxSize * 1024 * 1024;

      // Check file size
      const oversizedFiles = fileArray.filter((file) => file.size > maxSizeBytes);
      if (oversizedFiles.length > 0) {
        setError(`File size must be less than ${maxSize}MB`);
        return null;
      }

      // Check if multiple files are allowed
      if (!multiple && fileArray.length > 1) {
        setError('Only one file is allowed');
        return null;
      }

      setError(null);
      return fileArray;
    },
    [maxSize, multiple]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const validFiles = validateFiles(e.dataTransfer.files);
      if (validFiles) {
        onFilesSelected(validFiles);
      }
    },
    [onFilesSelected, validateFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const validFiles = validateFiles(e.target.files);
      if (validFiles) {
        onFilesSelected(validFiles);
      }
    },
    [onFilesSelected, validateFiles]
  );

  return (
    <div className={cn('relative', className)}>
      <label
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/50 px-6 py-12 transition-colors',
          isDragging && 'border-indigo-500 bg-indigo-500/10',
          !isDragging && 'hover:border-indigo-500/50 hover:bg-slate-900'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className={cn('mb-4 h-12 w-12', isDragging ? 'text-indigo-400' : 'text-slate-500')} />
        <p className="mb-2 text-sm font-medium text-slate-300">
          <span className="text-indigo-400">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-slate-500">
          {accept !== '*' ? `Accepted formats: ${accept}` : 'All file types accepted'}
          {' • '}
          Max size: {maxSize}MB
        </p>

        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
        />
      </label>

      {error && (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="hover:text-red-300">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
