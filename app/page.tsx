'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAssetPath, getPagePath } from '@/lib/utils';
import VersionBadge from '@/components/VersionBadge';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAutoFill = () => {
    setUsername('info@taarifa.com');
    setPassword('Test123');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'info@taarifa.com' && password === 'Test123') {
      // Store login state in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
      router.push('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <VersionBadge />
      <div className="form-container">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src={getAssetPath('/logo-small.svg')}
            alt="Taarifa Logo" 
            style={{ width: '80px', height: '80px', marginBottom: '15px' }}
          />
          <h1 style={{ color: '#333', margin: '0' }}>
            Taarifa Login
          </h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              type="button" 
              onClick={handleAutoFill} 
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Auto Fill Credentials
            </button>

            <button 
              type="submit" 
              className="btn"
              style={{ width: '100%' }}
            >
              Login
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
                  <a href={getPagePath('/products')} className="btn btn-secondary" style={{ width: '100%', display: 'block' }}>View All Products</a>
        </div>
      </div>
    </div>
  );
}
