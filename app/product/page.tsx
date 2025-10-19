'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchProductByHash } from '@/lib/api-client';
import { getAssetPath, getPagePath } from '@/lib/utils';
import VersionBadge from '@/components/VersionBadge';

function ProductContent() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const hash = searchParams.get('hash');
      if (hash) {
        try {
          const foundProduct = await fetchProductByHash(hash);
          setProduct(foundProduct);
        } catch (error) {
          console.error('Error loading product:', error);
        }
      }
      setLoading(false);
    };
    
    loadProduct();
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
          <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href={getPagePath('/')} className="btn" style={{ width: '100%', display: 'block', textAlign: 'center' }}>Go Home</a>
            <a href={getPagePath('/products')} className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>View All Products</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <VersionBadge />
      <div className="navigation">
        <a href={getPagePath('/')}>Home</a>
        <a href={getPagePath('/products')}>View All Products</a>
      </div>

      <div className="product-card" style={{ maxWidth: '600px', margin: '50px auto', position: 'relative' }}>
        {/* Taarifa ribbon icon */}
        <div className="taarifa-ribbon" style={{ top: '15px', right: '15px' }}>
          <img 
            src={getAssetPath('/ribbon-icon.svg')}
            alt="Taarifa Verified" 
            style={{ 
              width: '36px', 
              height: '36px'
            }}
            title="Taarifa Verified Product"
          />
        </div>
        <h1 style={{ color: '#333', marginBottom: '20px', paddingRight: '55px' }}>{product.name}</h1>
        
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
          <a href={getPagePath('/products')} className="btn btn-secondary" style={{ width: '100%', display: 'block' }}>
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="container">
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    }>
      <ProductContent />
    </Suspense>
  );
}
