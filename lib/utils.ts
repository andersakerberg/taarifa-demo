/**
 * Get the correct asset path for both development and production
 * In production (GitHub Pages), assets are served from /taarifa-demo/
 * In development, assets are served from the root
 */
export function getAssetPath(path: string): string {
  // Check if we're in production (GitHub Pages)
  if (typeof window !== 'undefined') {
    // Debug logging for GitHub Pages detection
    console.log('getAssetPath debug:', {
      inputPath: path,
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      isGitHubPages: window.location.hostname.includes('github.io'),
      hasBasePath: window.location.pathname.startsWith('/taarifa-demo'),
      currentUrl: window.location.href
    });
    
    // Check for GitHub Pages deployment
    if (window.location.hostname.includes('github.io') || 
        window.location.pathname.startsWith('/taarifa-demo')) {
      // For GitHub Pages, we need to manually add the base path
      // since Next.js static export doesn't automatically handle this for public assets
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      const fullPath = `/taarifa-demo${normalizedPath}`;
      console.log('Using GitHub Pages asset path:', fullPath);
      return fullPath;
    }
    
    // Additional check: if we're on a GitHub Pages URL but the detection above failed
    if (window.location.hostname.includes('github.io')) {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      const fullPath = `/taarifa-demo${normalizedPath}`;
      console.log('Fallback GitHub Pages asset path:', fullPath);
      return fullPath;
    }
  }
  
  // For development or other environments
  console.log('Using development asset path:', path);
  return path;
}

/**
 * Get the correct page path for both development and production
 * In production (GitHub Pages), pages are served from /taarifa-demo/
 * In development, pages are served from the root
 */
export function getPagePath(path: string): string {
  // Check if we're in production (GitHub Pages)
  if (typeof window !== 'undefined') {
    // Debug logging for GitHub Pages detection
    console.log('getPagePath debug:', {
      inputPath: path,
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      isGitHubPages: window.location.hostname.includes('github.io'),
      hasBasePath: window.location.pathname.startsWith('/taarifa-demo')
    });
    
    // Check for GitHub Pages deployment
    if (window.location.hostname.includes('github.io') || 
        window.location.pathname.startsWith('/taarifa-demo')) {
      const fullPath = `/taarifa-demo${path}`;
      console.log('Using GitHub Pages path:', fullPath);
      return fullPath;
    }
  }
  
  // For development or other environments
  console.log('Using development path:', path);
  return path;
}

/**
 * Get the correct base URL for both development and production
 * In production (GitHub Pages), includes the base path
 * In development, uses the origin directly
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Debug logging for GitHub Pages detection
    console.log('getBaseUrl debug:', {
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      origin: window.location.origin,
      isGitHubPages: window.location.hostname.includes('github.io'),
      hasBasePath: window.location.pathname.startsWith('/taarifa-demo')
    });
    
    // Check for GitHub Pages deployment
    if (window.location.hostname.includes('github.io') || 
        window.location.pathname.startsWith('/taarifa-demo')) {
      const baseUrl = `${window.location.origin}/taarifa-demo`;
      console.log('Using GitHub Pages base URL:', baseUrl);
      return baseUrl;
    }
    console.log('Using development base URL:', window.location.origin);
    return window.location.origin;
  }
  
  // Fallback for server-side rendering
  return '';
}
