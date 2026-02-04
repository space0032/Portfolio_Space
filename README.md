# Interactive Developer Portfolio

![CI/CD Pipeline](https://github.com/space0032/Portfolio_Space/workflows/CI/CD%20Pipeline/badge.svg)

A modern, interactive portfolio website built with Next.js, React, Framer Motion, and TailwindCSS. Features smooth animations, dynamic interactions, automated CI/CD pipeline, and a polished user experience.

## 🎨 Features

### Hero Section with Animation
- **Animated Headline**: Eye-catching slide-in animation with gradient text
- **Particle Background**: Dynamic animated particles that create depth
- **Profile Image**: Animated profile with hover effects (scale and rotate)
- **Social Media Links**: Hover effects with scale and elevation animations
- **Glowing Contact Button**: Interactive button with gradient background and pulse effect
- **Scroll Indicator**: Animated scroll-down indicator

### Interactive Project Showcase
- **Card Flip Animation**: Click on project cards to reveal details
- **Hover Effects**: Cards scale and display glow effects on hover
- **Tech Stack Display**: Each project shows technologies used with styled badges
- **Demo Links**: Easy access to project demonstrations
- **Responsive Grid**: Adapts to different screen sizes

### Animated Skills Section
- **Progress Bars**: Animated fill animations showing skill proficiency
- **Icon Animations**: Skills icons rotate on hover
- **Hover Tooltips**: Display experience years and project count on hover
- **Additional Technologies**: Badge-style display of other tools and frameworks
- **Smooth Transitions**: All interactions are smooth and responsive

### Contact Form with Validation
- **Real-time Validation**: Instant feedback as users type
- **Visual Error Indicators**: Red borders and error messages for invalid fields
- **Success/Error Messages**: Animated feedback after form submission
- **Loading States**: Spinner animation during form submission
- **Email Format Validation**: Ensures valid email addresses
- **Message Length Check**: Minimum 10 characters for messages

### Dynamic Backgrounds
- **Gradient Transitions**: Smooth color transitions between sections
- **Particle Effects**: Animated particles in the hero section
- **Section-specific Themes**: Each section has its own color palette

### Page Transitions
- **Scroll Animations**: Elements fade and slide in as you scroll
- **Section Detection**: Animations trigger when sections enter viewport
- **Staggered Animations**: Child elements animate in sequence
- **Smooth Scrolling**: Native smooth scroll behavior

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.11
- **React**: 19.0.0
- **Animation**: Framer Motion 11.15.0
- **Styling**: TailwindCSS 3.4.1
- **Language**: TypeScript 5
- **Email Integration**: EmailJS (ready to configure)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/space0032/Portfolio_Space.git

# Navigate to project directory
cd Portfolio_Space

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📝 Configuration

### Customize Content
Edit the following files to personalize your portfolio:

1. **Hero Section** (`components/HeroSection.tsx`):
   - Update your name, title, and social media links
   - Customize particle count and colors

2. **About Section** (`components/AboutSection.tsx`):
   - Add your personal bio
   - Update timeline achievements

3. **Projects Section** (`components/ProjectsSection.tsx`):
   - Add your projects with descriptions
   - Include tech stacks and demo links
   - Use emojis or upload project screenshots

4. **Skills Section** (`components/SkillsSection.tsx`):
   - Update skills with your proficiency levels
   - Add experience years and project counts
   - Customize skill icons

5. **Contact Section** (`components/ContactSection.tsx`):
   - Update contact information
   - Configure EmailJS for form submissions

### Email Integration
To enable email functionality:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Update `ContactSection.tsx` with your EmailJS credentials:
   ```typescript
   import emailjs from '@emailjs/browser';
   
   emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     formData,
     'YOUR_PUBLIC_KEY'
   );
   ```

## 🎨 Customization

### Colors
Modify `tailwind.config.ts` to change the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      // Add your custom colors
      primary: "#your-color",
      secondary: "#your-color"
    }
  }
}
```

### Animations
Adjust animation speeds in `tailwind.config.ts`:

```typescript
animation: {
  'fade-in': 'fadeIn 1s ease-in',
  'slide-in': 'slideIn 0.8s ease-out',
  // Customize duration and easing
}
```

## 🔄 CI/CD Pipeline

This project includes automated CI/CD workflows using GitHub Actions.

### Automated Workflows

#### 1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
Automatically runs on every push and pull request:
- ✅ Builds the project on Node.js 18.x and 20.x
- ✅ Runs ESLint for code quality
- ✅ Creates production build
- ✅ Uploads build artifacts

#### 2. **Vercel Deployment** (`.github/workflows/deploy-vercel.yml`)
Automatically deploys to Vercel on push to main branch:
- 🚀 Builds optimized production bundle
- 🚀 Deploys to Vercel hosting
- 🚀 Provides preview URLs for pull requests

### Setup CI/CD

1. **Enable GitHub Actions**:
   - Push your code to GitHub
   - Workflows will run automatically

2. **View Workflow Status**:
   - Go to the "Actions" tab in your repository
   - See build status and logs

3. **Configure Vercel Deployment** (Optional):
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Get your token from https://vercel.com/account/tokens
   # Add as GitHub secret: VERCEL_TOKEN
   ```

For detailed CI/CD documentation, see [`.github/workflows/README.md`](.github/workflows/README.md)

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### GitHub Pages
Requires additional configuration for Next.js static export.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!