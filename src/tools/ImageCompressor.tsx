import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { DragDropZone } from '../components/DragDropZone';
import { ActionButton, ActionButtonGroup } from '../components/ActionButton';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(80);

  const handleFileSelect = (files: File[]) => {
    const selectedFile = files[0];
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedImage(null);
  };

  const compressImage = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality / 100,
      };

      const compressed = await imageCompression(file, options);
      setCompressedSize(compressed.size);

      const url = URL.createObjectURL(compressed);
      setCompressedImage(url);

      toast.success('Image compressed successfully!');
    } catch (error) {
      console.error('Compression error:', error);
      toast.error('Failed to compress image');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-${file?.name || 'image.jpg'}`;
    link.click();
  };

  const reductionPercent = originalSize && compressedSize
    ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
    : '0';

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress PNG/JPG images to reduce file size while maintaining quality"
    >
      <div className="space-y-6">
        {!file ? (
          <DragDropZone
            onFilesSelected={handleFileSelect}
            accept="image/png,image/jpeg,image/jpg"
            maxSize={50}
          />
        ) : (
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-100">{file.name}</h3>
                  <p className="text-sm text-slate-400">
                    Original size: {(originalSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setCompressedImage(null);
                  }}
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <ActionButton onClick={compressImage} loading={loading}>
                  Compress Image
                </ActionButton>
              </div>
            </div>

            {compressedImage && (
              <div className="space-y-4">
                <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                  <h4 className="mb-2 font-medium text-green-400">Compression Complete!</h4>
                  <p className="text-sm text-slate-300">
                    Compressed size: {(compressedSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="text-sm text-green-400">
                    Reduction: {reductionPercent}%
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-slate-300">Original</h4>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Original"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-slate-300">Compressed</h4>
                    <img src={compressedImage} alt="Compressed" className="w-full rounded-lg" />
                  </div>
                </div>

                <ActionButtonGroup>
                  <ActionButton onClick={downloadImage} icon={<Download className="h-4 w-4" />}>
                    Download Compressed Image
                  </ActionButton>
                </ActionButtonGroup>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
