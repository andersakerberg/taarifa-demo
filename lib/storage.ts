import CryptoJS from 'crypto-js';

export interface Product {
  id: string;
  name: string;
  description: string;
  hash: string;
}

// In-memory storage for products
let products: Product[] = [];

// Load products from localStorage on client side
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('taarifa-products');
  if (stored) {
    try {
      products = JSON.parse(stored);
    } catch (e) {
      console.error('Error loading products from localStorage:', e);
    }
  }
}

const saveProducts = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('taarifa-products', JSON.stringify(products));
  }
};

export const addProduct = (product: Omit<Product, 'hash'>): Product => {
  const hash = CryptoJS.SHA256(`${product.id}-${product.name}-${Date.now()}`).toString();
  const newProduct: Product = {
    ...product,
    hash
  };
  products.push(newProduct);
  saveProducts();
  return newProduct;
};

export const getProductByHash = (hash: string): Product | null => {
  return products.find(product => product.hash === hash) || null;
};

export const getAllProducts = (): Product[] => {
  return [...products];
};

export const clearProducts = (): void => {
  products = [];
  saveProducts();
};
