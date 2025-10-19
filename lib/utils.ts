/**
 * Get the correct asset path for both development and production
 * In production (GitHub Pages), assets are served from /taarifa-demo/
 * In development, assets are served from the root
 */
export function getAssetPath(path: string): string {
  // Check if we're in production (GitHub Pages)
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    return `/taarifa-demo${path}`;
  }
  
  // For development or other environments
  return path;
}
