# GitHub Pages Deployment Guide

This guide explains how to deploy the Taarifa Product Management System to GitHub Pages.

## Prerequisites

1. A GitHub repository named `taarifa-demo` (case-sensitive)
2. GitHub Pages enabled in your repository settings
3. The repository should be public (required for free GitHub Pages)

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Configure Repository Settings

The workflow is already configured to deploy to GitHub Pages. The app will be available at:
`https://[your-username].github.io/taarifa-demo/`

### 3. Push to Main Branch

The deployment workflow will automatically trigger when you push to the `main` branch:

```bash
git add .
git commit -m "Initial commit with GitHub Pages setup"
git push origin main
```

### 4. Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your app will be live at the GitHub Pages URL

## Configuration Details

### Next.js Configuration

The app is configured for static export with:
- `output: 'export'` - Generates static files
- `trailingSlash: true` - Adds trailing slashes to URLs
- `images: { unoptimized: true }` - Disables image optimization for static export
- `basePath: '/taarifa-demo'` - Sets the base path for GitHub Pages

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`) includes:
- Automatic detection of package manager (npm/yarn)
- Node.js 18 setup
- Dependency installation and caching
- Next.js build with static export
- Automatic deployment to GitHub Pages

### Storage Considerations

- Products are stored in browser localStorage
- Data persists across sessions for each user
- No server-side storage (static site limitation)

## Troubleshooting

### Common Issues

1. **404 Errors**: Make sure the repository name is exactly `taarifa-demo` (case-sensitive)
2. **Build Failures**: Check the Actions tab for error details
3. **Routing Issues**: Ensure all links use relative paths

### Manual Deployment

If automatic deployment fails, you can manually trigger it:
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click **Run workflow**
4. Select the main branch and click **Run workflow**

### Local Testing

To test the production build locally:

```bash
npm run build
npx serve out
```

This will serve the static files locally, simulating the GitHub Pages environment.

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure your domain's DNS to point to `[your-username].github.io`
3. Enable custom domain in GitHub Pages settings

## Environment Variables

For production builds, the app automatically uses:
- `NODE_ENV=production` - Enables production optimizations
- `basePath=/taarifa-demo` - Sets the correct base path for GitHub Pages

No additional environment variables are required for basic functionality.
