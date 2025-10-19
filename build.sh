#!/bin/bash

# Set environment variables
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Install dependencies
npm ci

# Try to build with different approaches
echo "Attempting to build with Next.js..."

# Method 1: Standard build
if npm run build; then
    echo "Build successful with standard method"
    exit 0
fi

echo "Standard build failed, trying alternative approach..."

# Method 2: Try with different Node options
export NODE_OPTIONS="--max-old-space-size=4096"
if npm run build; then
    echo "Build successful with increased memory"
    exit 0
fi

echo "Standard build failed, trying with Node.js 18..."

# Method 3: Try with Node.js 18 using nvm if available
if command -v nvm &> /dev/null; then
    nvm use 18
    if npm run build; then
        echo "Build successful with Node.js 18"
        exit 0
    fi
fi

echo "All build methods failed"
exit 1
