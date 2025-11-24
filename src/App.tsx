import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
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
import { YoutubeThumbnailDownloader } from './tools/YoutubeThumbnailDownloader';
import { QRCodeGenerator } from './tools/QRCodeGenerator';
import { OpenGraphGenerator } from './tools/OpenGraphGenerator';
import { HashtagGenerator } from './tools/HashtagGenerator';
import { TweetToImage } from './tools/TweetToImage';
import { UTMBuilder } from './tools/UTMBuilder';
import { ColorConverter } from './tools/ColorConverter';
import { NumberBaseConverter } from './tools/NumberBaseConverter';
import { UnixTimestampConverter } from './tools/UnixTimestampConverter';
import { JSONYAMLConverter } from './tools/JSONYAMLConverter';
import { JSONCSVConverter } from './tools/JSONCSVConverter';
import { PercentageCalculator } from './tools/PercentageCalculator';
import { DiscountCalculator } from './tools/DiscountCalculator';
import { ROICalculator } from './tools/ROICalculator';
import { LoanCalculator } from './tools/LoanCalculator';
import { AspectRatioCalculator } from './tools/AspectRatioCalculator';
import { CSSMinifier } from './tools/CSSMinifier';
import { JSMinifier } from './tools/JSMinifier';
import { HTMLEntityEncoder } from './tools/HTMLEntityEncoder';
import { UserAgentParser } from './tools/UserAgentParser';
import { URLParser } from './tools/URLParser';
import { SlugGenerator } from './tools/SlugGenerator';
import { RandomStringGenerator } from './tools/RandomStringGenerator';
import { BinaryTextTranslator } from './tools/BinaryTextTranslator';
import { MorseCodeTranslator } from './tools/MorseCodeTranslator';
import { PalindromeChecker } from './tools/PalindromeChecker';
import { ReverseText } from './tools/ReverseText';
import { MemeGenerator } from './tools/MemeGenerator';
import { ImageColorExtractor } from './tools/ImageColorExtractor';
import { SVGBlobGenerator } from './tools/SVGBlobGenerator';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" theme="dark" />
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          
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
          
          {/* Marketing Tools */}
          <Route path="/tools/youtube-thumbnail-downloader" element={<YoutubeThumbnailDownloader />} />
          <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/tools/open-graph-generator" element={<OpenGraphGenerator />} />
          <Route path="/tools/hashtag-generator" element={<HashtagGenerator />} />
          <Route path="/tools/tweet-to-image" element={<TweetToImage />} />
          <Route path="/tools/utm-builder" element={<UTMBuilder />} />
          
          {/* Converter Tools */}
          <Route path="/tools/color-converter" element={<ColorConverter />} />
          <Route path="/tools/number-base-converter" element={<NumberBaseConverter />} />
          <Route path="/tools/unix-timestamp-converter" element={<UnixTimestampConverter />} />
          <Route path="/tools/json-yaml-converter" element={<JSONYAMLConverter />} />
          <Route path="/tools/json-csv-converter" element={<JSONCSVConverter />} />
          
          {/* Finance Tools */}
          <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/tools/discount-calculator" element={<DiscountCalculator />} />
          <Route path="/tools/roi-calculator" element={<ROICalculator />} />
          <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
          <Route path="/tools/aspect-ratio-calculator" element={<AspectRatioCalculator />} />
          
          {/* Web Dev Tools */}
          <Route path="/tools/css-minifier" element={<CSSMinifier />} />
          <Route path="/tools/js-minifier" element={<JSMinifier />} />
          <Route path="/tools/html-entity-encoder" element={<HTMLEntityEncoder />} />
          <Route path="/tools/user-agent-parser" element={<UserAgentParser />} />
          <Route path="/tools/url-parser" element={<URLParser />} />
          <Route path="/tools/slug-generator" element={<SlugGenerator />} />
          
          {/* Text Extra Tools */}
          <Route path="/tools/random-string-generator" element={<RandomStringGenerator />} />
          <Route path="/tools/binary-text-translator" element={<BinaryTextTranslator />} />
          <Route path="/tools/morse-code-translator" element={<MorseCodeTranslator />} />
          <Route path="/tools/palindrome-checker" element={<PalindromeChecker />} />
          <Route path="/tools/reverse-text" element={<ReverseText />} />
          
          {/* Image Extra Tools */}
          <Route path="/tools/meme-generator" element={<MemeGenerator />} />
          <Route path="/tools/image-color-extractor" element={<ImageColorExtractor />} />
          <Route path="/tools/svg-blob-generator" element={<SVGBlobGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
