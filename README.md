# Tools For Dev - Production-Ready SaaS Platform

A comprehensive, production-ready SaaS platform offering 60+ professional tools for developers, designers, and content creators. Built with Next.js 14+, TypeScript, and modern web technologies.

## 🚀 Features

- **60+ Professional Tools** across multiple categories
- **Authentication & Authorization** with NextAuth.js
- **Stripe Billing Integration** with multiple pricing tiers
- **Dark/Light Mode** with theme persistence
- **Responsive Design** optimized for all devices
- **SEO Optimized** with dynamic meta tags and sitemaps
- **Rate Limiting** with Redis for fair usage
- **Admin Dashboard** for analytics and management
- **Full Accessibility** with WCAG compliance
- **Type-Safe** with TypeScript strict mode

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** lucide-react
- **Animations:** Framer Motion
- **Database:** SQLite (dev) / Postgres (production)
- **Storage:** S3-compatible object storage
- **Cache:** Redis
- **Payment:** Stripe
- **Auth:** NextAuth.js

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Redis (optional, for rate limiting)
- PostgreSQL (for production)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/JewelPaul/TOOLS--FOR--DEV.git
cd TOOLS--FOR--DEV
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js (generate with `openssl rand -base64 32`)
- `STRIPE_SECRET_KEY` - Stripe secret key (test mode)
- Additional variables as needed

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build

```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

## 🎨 Project Structure

```
TOOLS--FOR--DEV/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   └── tools/          # Tool-specific components
│   ├── lib/                # Utilities and helpers
│   ├── styles/             # Global styles
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── prisma/                 # Database schema and migrations
└── tests/                  # Test files
```

## 🔧 Available Tools

### Text & String Tools (15 tools)
- Text case converter
- Word & character counter
- Remove duplicate lines
- Sort/shuffle lines
- Slugify/Deslugify
- Text diff/compare
- Lorem ipsum generator
- Text to speech
- Hash generator (MD5, SHA1, SHA256, SHA512)
- Base64 encode/decode
- ROT13/Caesar cipher
- Regex tester
- Markdown ↔ HTML converter
- HTML/CSS/JS minifier
- HTML/CSS/JS beautifier

### Code & Developer Tools (10 tools)
- JSON formatter & validator
- XML formatter & validator
- CSS minifier + autoprefixer
- JavaScript minifier
- SQL formatter
- Code diff viewer
- HTTP request builder
- JWT decoder
- CORS checker
- HTTP status code reference

### Image & Media Tools (10 tools)
- QR code generator
- Image compressor
- Image to Base64
- Image resize & format converter
- Favicon generator
- Color picker & palette generator
- Gradient generator
- Image crop tool
- Screenshot tool
- Placeholder image generator

### PDF & Document Tools (7 tools)
- PDF merge
- PDF split
- PDF compress
- Images to PDF
- PDF to images
- PDF page reorder
- PDF metadata editor

### Data & Spreadsheet Tools (6 tools)
- CSV ↔ JSON converter
- CSV cleaner & validator
- Excel/XLSX viewer
- TSV converter
- UUID generator
- Epoch/Unix timestamp converter

### SEO & Marketing Tools (6 tools)
- Meta tag generator
- Robots.txt generator
- Sitemap.xml generator
- Keyword density checker
- Title & meta length validator
- Readability score

### Network & Security Tools (6 tools)
- IP lookup
- DNS lookup
- SSL certificate checker
- WHOIS lookup
- Port checker
- Password generator & strength meter

### Utilities & Converters (8 tools)
- URL encoder/decoder
- URL shortener
- Unit converter
- Currency converter
- Timezone converter
- Barcode generator
- Random data generator
- Hash comparison tool

### Productivity Tools (5 tools)
- Notepad (localStorage)
- Pomodoro timer
- Countdown timer
- Date calculator
- Invoice generator

## 💎 Pricing Tiers

- **Free:** 10 requests/day, basic tools
- **Pro ($6/mo):** 500 requests/day, all tools, no watermarks
- **Team ($29/mo):** Unlimited requests, team workspace, priority support
- **Enterprise:** Custom pricing, dedicated support, SLA

## 🔐 Security

- Input sanitization with DOMPurify
- CSP headers configured
- Rate limiting per plan
- File size validation
- Automatic file deletion
- No logging of sensitive data
- GDPR compliance ready

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📧 Contact

For questions or support, please contact us at support@toolsfordev.tech

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Vercel](https://vercel.com/)

---

**Legacy Note:** The previous static HTML version has been preserved in the `_legacy_static` directory for reference.
