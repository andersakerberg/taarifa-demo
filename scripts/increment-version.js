#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the type of version bump from command line arguments
const bumpType = process.argv[2] || 'patch'; // default to patch

// Path to the version file
const versionFilePath = path.join(__dirname, '..', 'lib', 'version.ts');

try {
  // Read the current version file
  let versionContent = fs.readFileSync(versionFilePath, 'utf8');
  
  // Extract current version numbers using regex
  const majorMatch = versionContent.match(/major:\s*(\d+)/);
  const minorMatch = versionContent.match(/minor:\s*(\d+)/);
  const patchMatch = versionContent.match(/patch:\s*(\d+)/);
  
  if (!majorMatch || !minorMatch || !patchMatch) {
    console.error('Could not find version numbers in version file');
    process.exit(1);
  }
  
  let currentMajor = parseInt(majorMatch[1], 10);
  let currentMinor = parseInt(minorMatch[1], 10);
  let currentPatch = parseInt(patchMatch[1], 10);
  
  // Increment the appropriate version number
  switch (bumpType) {
    case 'major':
      currentMajor += 1;
      currentMinor = 0;
      currentPatch = 0;
      break;
    case 'minor':
      currentMinor += 1;
      currentPatch = 0;
      break;
    case 'patch':
    default:
      currentPatch += 1;
      break;
  }
  
  // Replace the version numbers
  versionContent = versionContent.replace(
    /major:\s*\d+/,
    `major: ${currentMajor}`
  );
  versionContent = versionContent.replace(
    /minor:\s*\d+/,
    `minor: ${currentMinor}`
  );
  versionContent = versionContent.replace(
    /patch:\s*\d+/,
    `patch: ${currentPatch}`
  );
  
  // Write the updated version file
  fs.writeFileSync(versionFilePath, versionContent);
  
  console.log(`Version incremented: ${bumpType} → v${currentMajor}.${currentMinor}.${currentPatch}`);
  console.log(`Updated version file: ${versionFilePath}`);
  
} catch (error) {
  console.error('Error incrementing version:', error.message);
  process.exit(1);
}
