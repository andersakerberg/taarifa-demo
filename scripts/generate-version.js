#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Generate a unique hash for this build
const buildHash = crypto.randomBytes(8).toString('hex');

// Read the current version file
const versionFilePath = path.join(__dirname, '..', 'lib', 'version.ts');
let versionContent = fs.readFileSync(versionFilePath, 'utf8');

// Replace the placeholder with the actual hash
versionContent = versionContent.replace('BUILD_HASH_PLACEHOLDER', buildHash);

// Write the updated version file
fs.writeFileSync(versionFilePath, versionContent);

console.log(`Generated build version: ${buildHash}`);
console.log(`Updated version file: ${versionFilePath}`);
