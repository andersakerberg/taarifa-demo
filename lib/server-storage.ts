/**
 * Server-side in-memory storage for products
 * This persists data on the server side during the application lifecycle
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  hash: string;
  createdAt: Date;
}

// In-memory storage
let products: Product[] = [];

/**
 * Add a new product to server-side storage
 */
export function addProduct(name: string, description: string): Product {
  const id = generateId();
  const hash = generateHash(id + name + description);
  
  const product: Product = {
    id,
    name,
    description,
    hash,
    createdAt: new Date()
  };
  
  products.push(product);
  console.log(`Product added to server storage: ${product.name} (${product.id})`);
  return product;
}

/**
 * Get all products from server-side storage
 */
export function getAllProducts(): Product[] {
  return [...products]; // Return a copy to prevent external mutations
}

/**
 * Get a product by hash from server-side storage
 */
export function getProductByHash(hash: string): Product | null {
  return products.find(product => product.hash === hash) || null;
}

/**
 * Get a product by ID from server-side storage
 */
export function getProductById(id: string): Product | null {
  return products.find(product => product.id === id) || null;
}

/**
 * Delete a product from server-side storage
 */
export function deleteProduct(id: string): boolean {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    console.log(`Product deleted from server storage: ${id}`);
    return true;
  }
  return false;
}

/**
 * Update a product in server-side storage
 */
export function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'hash' | 'createdAt'>>): Product | null {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    console.log(`Product updated in server storage: ${id}`);
    return products[index];
  }
  return null;
}

/**
 * Clear all products from server-side storage
 */
export function clearAllProducts(): void {
  products = [];
  console.log('All products cleared from server storage');
}

/**
 * Get the count of products in server-side storage
 */
export function getProductCount(): number {
  return products.length;
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
