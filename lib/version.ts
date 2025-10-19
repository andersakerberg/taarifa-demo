/**
 * Version information for the application
 * This file is generated at build time with a unique hash
 */

export const VERSION = {
  // This will be replaced at build time with a unique hash
  hash: '705a1887cd8d36d5',
  // Static version info
  major: 1,
  minor: 0,
  patch: 11,
  // Get full version string
  get full() {
    return `${this.major}.${this.minor}.${this.patch}-${this.hash}`;
  },
  // Get short version string
  get short() {
    return `v${this.major}.${this.minor}.${this.patch}`;
  }
};
