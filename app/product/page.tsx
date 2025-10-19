'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProductByHash } from '@/lib/storage';

export default function ProductPage() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hash = searchParams.get('hash');
    if (hash) {
      const foundProduct = getProductByHash(hash);
      setProduct(foundProduct);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div className="error-icon">❌</div>
          <h1 className="error-message">Invalid Code</h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
            The product code you entered is invalid or does not exist.
          </p>
          <div style={{ marginTop: '30px' }}>
            <a href="/" className="btn">Go Home</a>
            <a href="/products" className="btn btn-secondary">View All Products</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="navigation">
        <a href="/">Home</a>
        <a href="/products">View All Products</a>
      </div>

      <div className="product-card" style={{ maxWidth: '600px', margin: '50px auto' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>{product.name}</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#666', marginBottom: '10px' }}>Product Information</h3>
          <p><strong>Product ID:</strong> {product.id}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Hash:</strong> <code style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '2px 6px', 
            borderRadius: '3px',
            fontSize: '12px',
            wordBreak: 'break-all'
          }}>{product.hash}</code></p>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="/products" className="btn btn-secondary">
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
}
