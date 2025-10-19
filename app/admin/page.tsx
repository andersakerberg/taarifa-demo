'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct, getAllProducts, Product } from '@/lib/storage';
import { getAssetPath, getPagePath } from '@/lib/utils';
import VersionBadge from '@/components/VersionBadge';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Set client-side flag and load data
    setIsClient(true);
    
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!loggedIn) {
        router.push('/');
      } else {
        setIsLoggedIn(true);
        setProducts(getAllProducts());
      }
    }
  }, [router]);

  useEffect(() => {
    // Close avatar menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setShowAvatarMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (formData.name.length >= 5 && formData.description.length >= 5) {
        handleSubmit(e as any);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      setMessage('Please fill in all fields');
      return;
    }

    if (formData.name.length < 5) {
      setMessage('Product name must be at least 5 characters long');
      return;
    }

    if (formData.description.length < 5) {
      setMessage('Product description must be at least 5 characters long');
      return;
    }

    try {
      const newProduct = addProduct(formData.name, formData.description);
      setProducts(getAllProducts());
      setMessage(`Product added successfully! ID: ${newProduct.id}, Hash: ${newProduct.hash}`);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }
    setShowAvatarMenu(false);
    router.push('/');
  };

  const toggleAvatarMenu = () => {
    setShowAvatarMenu(!showAvatarMenu);
  };

  if (!isClient || !isLoggedIn) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <VersionBadge />
      <div className="navigation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <a href={getPagePath('/')}>Home</a>
          <a href={getPagePath('/products')}>View All Products</a>
        </div>
        
        <div ref={avatarRef} style={{ position: 'relative' }}>
          <button 
            onClick={toggleAvatarMenu}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              fontSize: '16px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            👤
          </button>
          
          {showAvatarMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              minWidth: '150px',
              zIndex: 1000,
              marginTop: '5px'
            }}>
              <div style={{ padding: '8px 0' }}>
                <div style={{ 
                  padding: '8px 16px', 
                  fontSize: '14px', 
                  color: '#666',
                  borderBottom: '1px solid #eee'
                }}>
                  info@taarifa.com
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#dc3545'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img 
          src={getAssetPath('/logo-small.svg')}
          alt="Taarifa Logo" 
          style={{ width: '60px', height: '60px', marginBottom: '10px' }}
        />
        <h1 style={{ margin: '0' }}>Product Management</h1>
      </div>

      <div className="form-container">
        <h2>Add New Product</h2>
        
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
          <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              minLength={5}
            />
            <div style={{ 
              fontSize: '12px', 
              color: formData.name.length < 5 ? '#dc3545' : '#28a745',
              marginTop: '5px'
            }}>
              {formData.name.length}/5 characters minimum
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
              minLength={5}
            />
            <div style={{ 
              fontSize: '12px', 
              color: formData.description.length < 5 ? '#dc3545' : '#28a745',
              marginTop: '5px'
            }}>
              {formData.description.length}/5 characters minimum
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-success"
            disabled={formData.name.length < 5 || formData.description.length < 5}
            style={{
              width: '100%',
              opacity: (formData.name.length < 5 || formData.description.length < 5) ? 0.6 : 1,
              cursor: (formData.name.length < 5 || formData.description.length < 5) ? 'not-allowed' : 'pointer'
            }}
          >
            Add Product
          </button>

          {message && (
            <div style={{ 
              marginTop: '20px', 
              padding: '10px', 
              backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
              color: message.includes('successfully') ? '#155724' : '#721c24',
              borderRadius: '5px',
              border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              {message}
            </div>
          )}
        </form>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Current Products ({products.length})</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card" style={{ position: 'relative' }}>
              {/* Taarifa ribbon icon */}
              <div className="taarifa-ribbon">
                <img 
                  src={getAssetPath('/ribbon-icon.svg')}
                  alt="Taarifa Verified" 
                  style={{ 
                    width: '28px', 
                    height: '28px'
                  }}
                  title="Taarifa Verified Product"
                />
              </div>
              <h3 style={{ wordBreak: 'break-word', marginBottom: '10px', paddingRight: '45px' }}>{product.name}</h3>
              <p style={{ wordBreak: 'break-word', marginBottom: '8px' }}><strong>ID:</strong> {product.id}</p>
              <p style={{ wordBreak: 'break-word', marginBottom: '8px' }}><strong>Description:</strong> {product.description}</p>
              <p style={{ wordBreak: 'break-all', marginBottom: '8px' }}><strong>Hash:</strong> <code style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '2px 6px', 
                borderRadius: '3px',
                fontSize: '12px',
                wordBreak: 'break-all'
              }}>{product.hash}</code></p>
              <a 
                href={`${getPagePath('/product')}?hash=${product.hash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ width: '100%', display: 'block', textAlign: 'center' }}
              >
                View Product
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
