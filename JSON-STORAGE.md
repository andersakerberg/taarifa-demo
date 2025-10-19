# JSON File-Based Storage System

This project uses a JSON file-based storage system for managing products instead of localStorage. This provides better persistence and makes the data more accessible.

## How It Works

### Data Storage
- **Primary storage**: `public/products.json` - JSON file containing all products
- **Backup storage**: localStorage - Fallback for client-side operations
- **Management script**: `scripts/manage-products.js` - Command-line tool for managing products

### Data Structure
```json
[
  {
    "id": "lzj61ch8z",
    "name": "Sample Product 1",
    "description": "This is a sample product for testing the system",
    "hash": "12811bb1",
    "createdAt": "2025-10-19T18:18:39.154Z"
  }
]
```

## Usage

### Command Line Management
```bash
# Add a new product
node scripts/manage-products.js add "Product Name" "Product Description"

# List all products
node scripts/manage-products.js list

# Clear all products
node scripts/manage-products.js clear
```

### Programmatic API
```typescript
import { getAllProducts, addProduct, getProductByHash } from '@/lib/json-storage';

// Get all products
const products = await getAllProducts();

// Add a new product
const newProduct = await addProduct("Name", "Description");

// Find product by hash
const product = await getProductByHash("hash123");
```

## Features

### Core Functions
- `getAllProducts()` - Get all products from JSON file
- `addProduct(name, description)` - Add a new product
- `getProductByHash(hash)` - Find product by hash
- `getProductById(id)` - Find product by ID
- `updateProduct(id, updates)` - Update existing product
- `deleteProduct(id)` - Delete a product
- `clearAllProducts()` - Clear all products

### Utility Functions
- `getProductCount()` - Get number of products
- `exportProducts()` - Export as JSON string
- `importProducts(jsonData)` - Import from JSON string
- `getProductsFromBackup()` - Get from localStorage backup

## Benefits

### Advantages over localStorage
- ✅ **Better persistence** - Data survives browser cache clearing
- ✅ **More accessible** - Easy to view and edit the data file
- ✅ **Version control** - JSON file can be tracked in git
- ✅ **Backup friendly** - Easy to backup and restore
- ✅ **Cross-device** - Data can be shared between devices
- ✅ **Human readable** - Easy to inspect and debug

### GitHub Pages Compatibility
- ✅ **Static file** - JSON file is served as a static asset
- ✅ **No server required** - Works with static site deployment
- ✅ **Client-side fetching** - Uses fetch() to load data
- ✅ **Fallback support** - localStorage backup for reliability

## File Structure
```
public/
  products.json          # Main data file
lib/
  json-storage.ts        # Storage API functions
scripts/
  manage-products.js     # Command-line management tool
```

## Data Flow

1. **App loads** → Fetches data from `public/products.json`
2. **User adds product** → Updates localStorage backup
3. **Data persists** → JSON file remains unchanged (client-side only)
4. **Manual updates** → Use management script to update JSON file

## Limitations

### Client-Side Only
- ❌ **No server-side writing** - Can't write to JSON file from browser
- ❌ **localStorage fallback** - Changes only saved to localStorage
- ❌ **Manual sync required** - Need to manually update JSON file

### Workarounds
- ✅ **Management script** - Use CLI tool to update JSON file
- ✅ **localStorage backup** - Changes saved locally as backup
- ✅ **Export/Import** - Easy data migration and backup

## Best Practices

### Development
1. Use the management script to add initial products
2. Test with the JSON file data
3. Use localStorage backup for temporary changes

### Production
1. Pre-populate JSON file with initial products
2. Use localStorage for user-generated content
3. Periodically sync localStorage data to JSON file

### Backup
1. Export data using `exportProducts()`
2. Save JSON file to version control
3. Use management script for bulk operations

This system provides a good balance between persistence and simplicity while maintaining compatibility with static site deployment.
