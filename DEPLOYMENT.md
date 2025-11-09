# Deployment Guide

This guide covers deploying Tools For Dev to various platforms.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required for production
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-generated-secret

# Optional (for future features)
DATABASE_URL=your-database-url
STRIPE_SECRET_KEY=your-stripe-key
REDIS_URL=your-redis-url
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment experience for Next.js applications.

#### Via GitHub Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables
6. Click "Deploy"

#### Via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Build Settings:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**netlify.toml configuration:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 3: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t tools-for-dev .
docker run -p 3000:3000 tools-for-dev
```

### Option 4: AWS (EC2 + PM2)

```bash
# Install PM2
npm install -g pm2

# Build
npm run build

# Start with PM2
pm2 start npm --name "tools-for-dev" -- start

# Save PM2 config
pm2 save

# Set up startup script
pm2 startup
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 5: Self-Hosted (PM2)

1. Clone repository on server:
```bash
git clone https://github.com/yourusername/TOOLS--FOR--DEV.git
cd TOOLS--FOR--DEV
```

2. Install dependencies:
```bash
npm install
```

3. Build application:
```bash
npm run build
```

4. Start with PM2:
```bash
pm2 start npm --name "tools-for-dev" -- start
pm2 save
pm2 startup
```

## Custom Domain Setup

### Vercel
1. Go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Configure DNS:
   - Add A record pointing to Netlify's load balancer
   - Or add CNAME record pointing to your site's subdomain

### DNS Configuration

For `toolsfordev.tech`:
```
A     @     76.76.21.21  (Vercel IP)
CNAME www   cname.vercel-dns.com
```

## SSL/HTTPS

All platforms provide automatic SSL certificates via Let's Encrypt.

### Vercel/Netlify
- Automatic SSL (no configuration needed)

### Self-Hosted
Use Certbot:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Performance Optimization

### Enable Caching

Add to `next.config.mjs`:
```javascript
async headers() {
  return [
    {
      source: '/(.*).(jpg|jpeg|png|gif|ico|svg|webp)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

### CDN Configuration

Both Vercel and Netlify include global CDN by default.

For custom CDN (CloudFlare):
1. Add your domain to CloudFlare
2. Update nameservers
3. Enable CDN features

## Monitoring

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
```

## Troubleshooting

### Build Fails

Check Node.js version:
```bash
node --version  # Should be 18+
```

Clear cache:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure they're prefixed with `NEXT_PUBLIC_` for client-side
- Restart dev server after changing `.env.local`
- Check Vercel/Netlify dashboard for environment variables

### 404 Errors

- Ensure all routes are properly exported
- Check `next.config.mjs` for redirects
- Verify build output includes all pages

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/deploy.yml`):
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm test
```

## Rollback

### Vercel
- Go to deployments
- Select previous deployment
- Click "Promote to Production"

### PM2
```bash
pm2 list
pm2 stop tools-for-dev
pm2 delete tools-for-dev
# Deploy previous version
pm2 start npm --name "tools-for-dev" -- start
```

## Scaling

### Vercel/Netlify
- Automatic scaling included
- Configure in project settings for higher limits

### Self-Hosted
Use PM2 cluster mode:
```bash
pm2 start npm --name "tools-for-dev" -i max -- start
```

## Support

For deployment issues:
- Check [Next.js Deployment docs](https://nextjs.org/docs/deployment)
- Review platform-specific guides
- Contact platform support

---

Last updated: 2024-02-05
