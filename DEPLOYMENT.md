# Deployment Guide

This guide covers deploying your Interactive Developer Portfolio to various hosting platforms.

## Vercel (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js and provides the best performance.

### Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to configure your deployment.

### Deploy via GitHub Integration

1. Visit [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your `Portfolio_Space` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

Your portfolio will be live at `https://your-project.vercel.app`

## Netlify

### Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build your site:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

### Deploy via Git Integration

1. Visit [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect to your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

## GitHub Pages

GitHub Pages requires additional configuration for Next.js:

1. Install the required package:
```bash
npm install --save-dev next-export-optimize-images
```

2. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Portfolio_Space',
};
```

3. Build:
```bash
npm run build
```

4. Deploy the `out` directory to GitHub Pages.

## Custom Domain

### Vercel
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

### Netlify
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration instructions

## Environment Variables

If you're using EmailJS or other services requiring API keys:

### Vercel
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add your variables (e.g., `NEXT_PUBLIC_EMAILJS_SERVICE_ID`)

### Netlify
1. Go to "Site settings"
2. Navigate to "Build & deploy" > "Environment"
3. Add your variables

## Post-Deployment Checklist

- ✅ Test all animations work correctly
- ✅ Verify all sections load properly
- ✅ Test contact form (if EmailJS is configured)
- ✅ Check responsive design on mobile devices
- ✅ Verify all links work correctly
- ✅ Test hover effects and interactions
- ✅ Check page load performance
- ✅ Ensure SEO meta tags are correct

## Performance Optimization

After deployment, consider:

1. **Enable CDN** - Already handled by Vercel/Netlify
2. **Image Optimization** - Use Next.js Image component for custom images
3. **Lazy Loading** - Already implemented via Framer Motion
4. **Compression** - Automatically handled by hosting platforms
5. **Caching** - Configure in your hosting platform settings

## Monitoring

### Vercel Analytics
Enable in project settings to track:
- Page views
- Performance metrics
- User behavior

### Google Analytics
Add to `app/layout.tsx`:
```typescript
import Script from 'next/script'

// Add in <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Clear cache: `rm -rf .next node_modules package-lock.json`
- Reinstall: `npm install`
- Rebuild: `npm run build`

### Animations Don't Work
- Verify Framer Motion is installed
- Check browser console for errors
- Ensure JavaScript is enabled

### Contact Form Issues
- Verify EmailJS credentials
- Check API key permissions
- Test with console logging

For more help, check the [Next.js documentation](https://nextjs.org/docs) or [Vercel documentation](https://vercel.com/docs).
