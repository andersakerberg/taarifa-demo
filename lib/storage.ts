/**
 * Enhanced localStorage-based storage that simulates server-side persistence
 * This provides a better structure and API for managing products
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  hash: string;
  createdAt: string; // ISO date string
}

const STORAGE_KEY = 'taarifa_products';

/**
 * Get all products from localStorage
 */
export function getAllProducts(): Product[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return [];
  }
}

/**
 * Save products to localStorage
 */
function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
}

/**
 * Add a new product
 */
export function addProduct(name: string, description: string): Product {
  const id = generateId();
  const hash = generateHash(id + name + description);
  
  const product: Product = {
    id,
    name,
    description,
    hash,
    createdAt: new Date().toISOString()
  };
  
  const products = getAllProducts();
  products.push(product);
  saveProducts(products);
  
  console.log(`Product added: ${product.name} (${product.id})`);
  return product;
}

/**
 * Get a product by hash
 */
export function getProductByHash(hash: string): Product | null {
  const products = getAllProducts();
  return products.find(product => product.hash === hash) || null;
}

/**
 * Get a product by ID
 */
export function getProductById(id: string): Product | null {
  const products = getAllProducts();
  return products.find(product => product.id === id) || null;
}

/**
 * Update a product
 */
export function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'hash' | 'createdAt'>>): Product | null {
  const products = getAllProducts();
  const index = products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    console.log(`Product updated: ${id}`);
    return products[index];
  }
  
  return null;
}

/**
 * Delete a product
 */
export function deleteProduct(id: string): boolean {
  const products = getAllProducts();
  const index = products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    products.splice(index, 1);
    saveProducts(products);
    console.log(`Product deleted: ${id}`);
    return true;
  }
  
  return false;
}

/**
 * Clear all products
 */
export function clearAllProducts(): void {
  saveProducts([]);
  console.log('All products cleared');
}

/**
 * Get product count
 */
export function getProductCount(): number {
  return getAllProducts().length;
}

/**
 * Export products (for backup)
 */
export function exportProducts(): string {
  return JSON.stringify(getAllProducts(), null, 2);
}

/**
 * Import products (for restore)
 */
export function importProducts(jsonData: string): boolean {
  try {
    const products = JSON.parse(jsonData);
    if (Array.isArray(products)) {
      saveProducts(products);
      console.log(`Imported ${products.length} products`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing products:', error);
    return false;
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
