/**
 * Client-side API service for interacting with the server-side storage
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  hash: string;
  createdAt: string; // ISO date string from server
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetch all products from the server
 */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products');
    const result: ApiResponse<Product[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch products');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Add a new product to the server
 */
export async function addProduct(name: string, description: string): Promise<Product> {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    
    const result: ApiResponse<Product> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to add product');
    }
    
    if (!result.data) {
      throw new Error('No product data returned');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

/**
 * Fetch a product by hash from the server
 */
export async function fetchProductByHash(hash: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/products/${hash}`);
    
    if (response.status === 404) {
      return null;
    }
    
    const result: ApiResponse<Product> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch product');
    }
    
    return result.data || null;
  } catch (error) {
    console.error('Error fetching product by hash:', error);
    throw error;
  }
}

/**
 * Clear all products from the server (for testing)
 */
export async function clearAllProducts(): Promise<void> {
  try {
    const response = await fetch('/api/products', {
      method: 'DELETE',
    });
    
    const result: ApiResponse<{ message: string }> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to clear products');
    }
  } catch (error) {
    console.error('Error clearing products:', error);
    throw error;
  }
}
