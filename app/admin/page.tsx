'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct, getAllProducts } from '@/lib/storage';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(getAllProducts());
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!loggedIn) {
        router.push('/');
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.name || !formData.description) {
      setMessage('Please fill in all fields');
      return;
    }

    // Check if product ID already exists
    const existingProduct = products.find(p => p.id === formData.id);
    if (existingProduct) {
      setMessage('Product with this ID already exists');
      return;
    }

    try {
      const newProduct = addProduct(formData);
      setProducts(getAllProducts());
      setMessage(`Product added successfully! Hash: ${newProduct.hash}`);
      setFormData({ id: '', name: '', description: '' });
    } catch (error) {
      setMessage('Error adding product');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }
    router.push('/');
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="navigation">
        <a href="/">Home</a>
        <a href="/products">View All Products</a>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <h1>Product Management</h1>

      <div className="form-container">
        <h2>Add New Product</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Product ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
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
            />
          </div>

          <button type="submit" className="btn btn-success">
            Add Product
          </button>

          {message && (
            <div style={{ 
              marginTop: '20px', 
              padding: '10px', 
              backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
              color: message.includes('successfully') ? '#155724' : '#721c24',
              borderRadius: '5px',
              border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`
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
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Hash:</strong> <code>{product.hash}</code></p>
              <a 
                href={`/product/${product.hash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
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
