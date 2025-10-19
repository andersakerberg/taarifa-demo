'use client';

import { useState, useEffect } from 'react';
import { getAllProducts, Product } from '@/lib/storage';
import { getAssetPath, getPagePath, getBaseUrl } from '@/lib/utils';
import VersionBadge from '@/components/VersionBadge';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag and load products
    setIsClient(true);
    setProducts(getAllProducts());
  }, []);

  useEffect(() => {
    // Generate QR codes for all products
    const generateQRCodes = async () => {
      const qrCodesData: { [key: string]: string } = {};
      
      for (const product of products) {
        try {
          const productUrl = `${getBaseUrl()}/product?hash=${product.hash}`;
          const qrCodeDataURL = await QRCode.toDataURL(productUrl, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          qrCodesData[product.id] = qrCodeDataURL;
        } catch (error) {
          console.error('Error generating QR code for product:', product.id, error);
        }
      }
      
      setQrCodes(qrCodesData);
    };

    if (isClient && products.length > 0) {
      generateQRCodes();
    }
  }, [products, isClient]);

  useEffect(() => {
    // Generate barcodes after QR codes are generated
    products.forEach((product) => {
      const canvas = document.getElementById(`barcode-${product.id}`) as HTMLCanvasElement;
      if (canvas && !canvas.hasAttribute('data-generated')) {
        try {
          JsBarcode(canvas, product.id, {
            format: "CODE128",
            width: 2,
            height: 100,
            displayValue: true,
            fontSize: 16,
            margin: 10
          });
          canvas.setAttribute('data-generated', 'true');
        } catch (error) {
          console.error('Error generating barcode for product:', product.id, error);
        }
      }
    });
  }, [products, qrCodes, isClient]);

  if (!isClient) {
    return (
      <div className="container">
        <VersionBadge />
        <div className="navigation">
          <a href={getPagePath('/')}>Home</a>
          <a href={getPagePath('/admin')}>Admin Panel</a>
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <VersionBadge />
      <div className="navigation">
        <a href={getPagePath('/')}>Home</a>
        <a href={getPagePath('/admin')}>Admin Panel</a>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img 
          src={getAssetPath('/logo-small.svg')}
          alt="Taarifa Logo" 
          style={{ width: '60px', height: '60px', marginBottom: '10px' }}
        />
        <h1 style={{ color: '#333', margin: '0' }}>
          All Products ({products.length})
        </h1>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>
          <h2 style={{ color: '#333' }}>No products found</h2>
          <p style={{ color: '#666' }}>Products will appear here once they are added through the admin panel.</p>
          <a href={getPagePath('/admin')} className="btn" style={{ width: '100%', display: 'block' }}>Go to Admin Panel</a>
        </div>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card" style={{ position: 'relative' }}>
              {/* Taarifa ribbon icon */}
              <div className="taarifa-ribbon">
                <img 
                  src={getAssetPath('/ribbon-icon.svg')}
                  alt="Taarifa Verified" 
                  style={{ 
                    width: '32px', 
                    height: '32px'
                  }}
                  title="Taarifa Verified Product"
                />
              </div>
              <h2 style={{ color: '#333', marginBottom: '15px', paddingRight: '50px' }}>{product.name}</h2>
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Hash:</strong> <code style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '2px 6px', 
                borderRadius: '3px',
                fontSize: '12px',
                wordBreak: 'break-all'
              }}>{product.hash}</code></p>

              <div style={{ marginTop: '20px' }}>
                <div className="qr-sticker">
                  <h3>QR Code</h3>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                    Scan with your mobile camera
                  </p>
                  {qrCodes[product.id] ? (
                    <img 
                      src={qrCodes[product.id]} 
                      alt={`QR Code for ${product.name}`}
                      style={{ maxWidth: '200px', height: 'auto' }}
                    />
                  ) : (
                    <div style={{ 
                      width: '200px', 
                      height: '200px', 
                      backgroundColor: '#f8f9fa', 
                      color: '#666',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto',
                      borderRadius: '5px'
                    }}>
                      Generating QR Code...
                    </div>
                  )}
                </div>

                <div className="barcode-sticker">
                  <h3>Barcode</h3>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                    Product ID: {product.id}
                  </p>
                  <canvas 
                    id={`barcode-${product.id}`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <a 
                  href={`${getPagePath('/product')}?hash=${product.hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', display: 'block' }}
                >
                  View Product Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
