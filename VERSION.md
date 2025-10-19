# Version Management

This project uses an automated version management system that tracks both semantic versioning and build-specific hashes.

## How It Works

### Automatic Version Incrementing
- **Pre-commit hook**: Automatically increments the patch number on every commit
- **Build hash generation**: Each build gets a unique 16-character hex hash
- **Version display**: Shows current version in the top-right corner of all pages

### Version Components

#### Semantic Versioning
- **Major**: Breaking changes (increments minor and patch to 0)
- **Minor**: New features (increments patch to 0)  
- **Patch**: Bug fixes and small changes (default for commits)

#### Build Hash
- **Unique per build**: Generated using crypto.randomBytes()
- **16 characters**: Hex string for compact display
- **Build tracking**: Helps identify specific deployments

## Usage

### Automatic (Recommended)
The version is automatically managed through git hooks:

```bash
# Just commit normally - patch version increments automatically
git add .
git commit -m "Fix login bug"
# Version automatically goes from v1.0.2 to v1.0.3
```

### Manual Version Bumping
For major features or breaking changes:

```bash
# Increment patch version (bug fixes)
npm run version:patch

# Increment minor version (new features)
npm run version:minor

# Increment major version (breaking changes)
npm run version:major
```

### Version Display
The current version is displayed on all pages:
- **Short format**: `v1.0.2` (compact display)
- **Full format**: `1.0.2-705a1887cd8d36d5` (includes build hash)

## Files

### Core Files
- `lib/version.ts` - Version configuration and display logic
- `components/VersionBadge.tsx` - UI component for version display
- `scripts/increment-version.js` - Version incrementing logic
- `scripts/generate-version.js` - Build hash generation

### Git Hooks
- `.git/hooks/pre-commit` - Automatically increments patch on commit

### Build Integration
- `package.json` - NPM scripts for version management
- `.github/workflows/deploy.yml` - Version generation in CI/CD

## Version History

The version system tracks:
- **Semantic changes**: Major.minor.patch progression
- **Build identification**: Unique hash per deployment
- **Commit tracking**: Automatic patch increments
- **Deployment verification**: Know exactly which build is live

## Examples

### Typical Workflow
```bash
# Start with v1.0.0
git commit -m "Initial commit"
# → v1.0.1 (patch auto-incremented)

# Add new feature
npm run version:minor
git commit -m "Add QR code scanning"
# → v1.1.0 (minor incremented)

# Fix bug
git commit -m "Fix QR code display"
# → v1.1.1 (patch auto-incremented)
```

### Build Process
```bash
# Each build generates new hash
npm run build
# → v1.1.1-a1b2c3d4e5f67890

# Next build gets different hash
npm run build  
# → v1.1.1-f9e8d7c6b5a43210
```

This system ensures every commit and build is uniquely identifiable while maintaining semantic versioning standards.
