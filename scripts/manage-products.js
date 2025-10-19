#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');

/**
 * Load products from JSON file
 */
function loadProducts() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error.message);
    return [];
  }
}

/**
 * Save products to JSON file
 */
function saveProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log(`Saved ${products.length} products to ${PRODUCTS_FILE}`);
  } catch (error) {
    console.error('Error saving products:', error.message);
  }
}

/**
 * Add a product
 */
function addProduct(name, description) {
  const products = loadProducts();
  
  const id = Math.random().toString(36).substr(2, 9);
  const hash = generateHash(id + name + description);
  
  const product = {
    id,
    name,
    description,
    hash,
    createdAt: new Date().toISOString()
  };
  
  products.push(product);
  saveProducts(products);
  
  console.log(`Added product: ${product.name} (${product.id})`);
  return product;
}

/**
 * List all products
 */
function listProducts() {
  const products = loadProducts();
  console.log(`\nFound ${products.length} products:`);
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} (${product.id})`);
    console.log(`   Description: ${product.description}`);
    console.log(`   Hash: ${product.hash}`);
    console.log(`   Created: ${product.createdAt}`);
    console.log('');
  });
}

/**
 * Clear all products
 */
function clearProducts() {
  saveProducts([]);
  console.log('All products cleared');
}

/**
 * Generate hash
 */
function generateHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'add':
    const name = process.argv[3];
    const description = process.argv[4];
    if (!name || !description) {
      console.log('Usage: node scripts/manage-products.js add "Product Name" "Product Description"');
      process.exit(1);
    }
    addProduct(name, description);
    break;
    
  case 'list':
    listProducts();
    break;
    
  case 'clear':
    clearProducts();
    break;
    
  default:
    console.log('Usage:');
    console.log('  node scripts/manage-products.js add "Name" "Description"  - Add a product');
    console.log('  node scripts/manage-products.js list                      - List all products');
    console.log('  node scripts/manage-products.js clear                     - Clear all products');
    break;
}
