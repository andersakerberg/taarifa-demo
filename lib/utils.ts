/**
 * Get the correct asset path for both development and production
 * In production (GitHub Pages), assets are served from /taarifa-demo/
 * In development, assets are served from the root
 */
export function getAssetPath(path: string): string {
  // Check if we're in production (GitHub Pages)
  if (typeof window !== 'undefined') {
    // Check for GitHub Pages deployment
    if (window.location.hostname.includes('github.io') || 
        window.location.pathname.startsWith('/taarifa-demo')) {
      return `/taarifa-demo${path}`;
    }
  }
  
  // For development or other environments
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
    // Check for GitHub Pages deployment
    if (window.location.hostname.includes('github.io') || 
        window.location.pathname.startsWith('/taarifa-demo')) {
      return `/taarifa-demo${path}`;
    }
  }
  
  // For development or other environments
  return path;
}
