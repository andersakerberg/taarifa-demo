/**
 * JSON file-based storage for products
 * This provides better persistence than localStorage and is more accessible
 */

import { getAssetPath } from './utils';

export interface Product {
  id: string;
  name: string;
  description: string;
  hash: string;
  createdAt: string; // ISO date string
}

/**
 * Get all products from the JSON file and localStorage backup
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    // First try to get from JSON file using the correct asset path
    const jsonFilePath = getAssetPath('/products.json');
    const response = await fetch(jsonFilePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const jsonProducts = await response.json();
    const products = Array.isArray(jsonProducts) ? jsonProducts : [];
    
    // Also get from localStorage backup and merge
    const backupProducts = getProductsFromBackup();
    
    // Merge products, giving priority to localStorage (more recent)
    const allProducts = [...products];
    backupProducts.forEach(backupProduct => {
      if (!allProducts.find(p => p.id === backupProduct.id)) {
        allProducts.push(backupProduct);
      }
    });
    
    return allProducts;
  } catch (error) {
    console.error('Error loading products from JSON file:', error);
    // Fallback to localStorage only
    return getProductsFromBackup();
  }
}

/**
 * Save products to the JSON file
 * Note: This is a client-side operation, so we'll use a different approach
 */
async function saveProducts(products: Product[]): Promise<void> {
  // Since we can't write to files from the client-side in a static site,
  // we'll use localStorage as a fallback and provide instructions for manual updates
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('taarifa_products_backup', JSON.stringify(products));
      console.log('Products saved to localStorage backup');
    } catch (error) {
      console.error('Error saving products to localStorage backup:', error);
    }
  }
}

/**
 * Add a new product
 */
export async function addProduct(name: string, description: string): Promise<Product> {
  const id = generateId();
  const hash = generateHash(id + name + description);
  
  const product: Product = {
    id,
    name,
    description,
    hash,
    createdAt: new Date().toISOString()
  };
  
  const products = await getAllProducts();
  products.push(product);
  
  // Save to localStorage backup (since we can't write to JSON file from client)
  await saveProducts(products);
  
  console.log(`Product added: ${product.name} (${product.id})`);
  console.log('Note: Product saved to localStorage backup. Use management script to update JSON file.');
  return product;
}

/**
 * Get a product by hash
 */
export async function getProductByHash(hash: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find(product => product.hash === hash) || null;
}

/**
 * Get a product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find(product => product.id === id) || null;
}

/**
 * Update a product
 */
export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'hash' | 'createdAt'>>): Promise<Product | null> {
  const products = await getAllProducts();
  const index = products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    await saveProducts(products);
    console.log(`Product updated: ${id}`);
    return products[index];
  }
  
  return null;
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getAllProducts();
  const index = products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    products.splice(index, 1);
    await saveProducts(products);
    console.log(`Product deleted: ${id}`);
    console.log('Note: Product removed from localStorage backup. Use management script to update JSON file.');
    return true;
  }
  
  return false;
}

/**
 * Clear all products
 */
export async function clearAllProducts(): Promise<void> {
  await saveProducts([]);
  console.log('All products cleared');
}

/**
 * Get product count
 */
export async function getProductCount(): Promise<number> {
  const products = await getAllProducts();
  return products.length;
}

/**
 * Export products (for backup)
 */
export async function exportProducts(): Promise<string> {
  const products = await getAllProducts();
  return JSON.stringify(products, null, 2);
}

/**
 * Import products (for restore)
 */
export async function importProducts(jsonData: string): Promise<boolean> {
  try {
    const products = JSON.parse(jsonData);
    if (Array.isArray(products)) {
      await saveProducts(products);
      console.log(`Imported ${products.length} products`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing products:', error);
    return false;
  }
}

/**
 * Get products from localStorage backup (fallback)
 */
export function getProductsFromBackup(): Product[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem('taarifa_products_backup');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading products from localStorage backup:', error);
    return [];
  }
}

// Helper functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function generateHash(input: string): string {
  // Simple hash function for demo purposes
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}
