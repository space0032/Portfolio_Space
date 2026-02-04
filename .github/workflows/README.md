# CI/CD Workflows

This directory contains GitHub Actions workflows for automated building, testing, and deployment.

## Available Workflows

### 1. CI/CD Pipeline (`ci.yml`)

**Triggers:**
- Push to `main`, `master`, or `develop` branches
- Pull requests to `main`, `master`, or `develop` branches

**What it does:**
- ✅ Tests the build on Node.js 18.x and 20.x
- ✅ Installs dependencies
- ✅ Runs ESLint for code quality
- ✅ Builds the Next.js application
- ✅ Uploads build artifacts for the latest Node version

**Status Badge:**
Add this to your main README.md:
```markdown
![CI/CD](https://github.com/space0032/Portfolio_Space/workflows/CI/CD%20Pipeline/badge.svg)
```

## Setup Instructions

### 1. Enable GitHub Actions
1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. GitHub Actions should be enabled by default

### 2. Push Your Code
Once you push code to GitHub, the workflow will automatically run.

### 3. View Workflow Results
- Go to the "Actions" tab in your repository
- Click on any workflow run to see details
- Green checkmark ✅ = Success
- Red X ❌ = Failed (check logs for details)

## Deployment Options

The workflow includes a commented-out deployment job. Uncomment and configure based on your deployment platform:

### Option 1: Vercel (Recommended for Next.js)
1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-deploy on every push to main

### Option 2: Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Option 3: Custom Server
Uncomment the deploy job in `ci.yml` and add your deployment steps.

## Troubleshooting

### Build Fails
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Test the build locally: `npm run build`

### Linting Errors
- Run `npm run lint` locally to see errors
- Fix errors or update `.eslintrc.json` configuration

## Best Practices

1. **Always test locally** before pushing
2. **Use pull requests** for code review
3. **Keep dependencies updated** with `npm update`
4. **Monitor workflow runs** in the Actions tab
5. **Add tests** when your project grows

## Future Enhancements

- [ ] Add unit tests with Jest
- [ ] Add E2E tests with Playwright
- [ ] Add code coverage reporting
- [ ] Add automatic dependency updates (Dependabot)
- [ ] Add security scanning
- [ ] Add performance monitoring
