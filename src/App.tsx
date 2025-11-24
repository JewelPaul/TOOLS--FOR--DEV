import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { ImageCompressor } from './tools/ImageCompressor';
import { ImageResizer } from './tools/ImageResizer';
import { ImageCropper } from './tools/ImageCropper';
import { FormatConverter } from './tools/FormatConverter';
import { PrivacyBlur } from './tools/PrivacyBlur';
import { PDFMerger } from './tools/PDFMerger';
import { PDFToImage } from './tools/PDFToImage';
import { ImageToPDF } from './tools/ImageToPDF';
import { PDFSplitter } from './tools/PDFSplitter';
import { WatermarkPDF } from './tools/WatermarkPDF';
import { WordCounter } from './tools/WordCounter';
import { CaseConverter } from './tools/CaseConverter';
import { LineBreaksRemover } from './tools/LineBreaksRemover';
import { TextRepeater } from './tools/TextRepeater';
import { LoremIpsum } from './tools/LoremIpsum';
import { JSONFormatter } from './tools/JSONFormatter';
import { URLEncoder } from './tools/URLEncoder';
import { Base64Converter } from './tools/Base64Converter';
import { UUIDGenerator } from './tools/UUIDGenerator';
import { PasswordGenerator } from './tools/PasswordGenerator';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" theme="dark" />
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomePage />} />
          
          {/* Image Tools */}
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/tools/image-resizer" element={<ImageResizer />} />
          <Route path="/tools/image-cropper" element={<ImageCropper />} />
          <Route path="/tools/format-converter" element={<FormatConverter />} />
          <Route path="/tools/privacy-blur" element={<PrivacyBlur />} />
          
          {/* PDF Tools */}
          <Route path="/tools/pdf-merger" element={<PDFMerger />} />
          <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
          <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
          <Route path="/tools/pdf-splitter" element={<PDFSplitter />} />
          <Route path="/tools/watermark-pdf" element={<WatermarkPDF />} />
          
          {/* Text Tools */}
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          <Route path="/tools/line-breaks-remover" element={<LineBreaksRemover />} />
          <Route path="/tools/text-repeater" element={<TextRepeater />} />
          <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
          
          {/* Developer Tools */}
          <Route path="/tools/json-formatter" element={<JSONFormatter />} />
          <Route path="/tools/url-encoder" element={<URLEncoder />} />
          <Route path="/tools/base64-converter" element={<Base64Converter />} />
          <Route path="/tools/uuid-generator" element={<UUIDGenerator />} />
          
          {/* Security Tools */}
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
