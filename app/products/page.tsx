'use client';

import { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/storage';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

export default function ProductsPage() {
  const [products, setProducts] = useState(getAllProducts());
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Generate QR codes for all products
    const generateQRCodes = async () => {
      const qrCodesData: { [key: string]: string } = {};
      
      for (const product of products) {
        try {
          const productUrl = `${window.location.origin}/product?hash=${product.hash}`;
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

    if (products.length > 0) {
      generateQRCodes();
    }
  }, [products]);

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
  }, [products, qrCodes]);

  return (
    <div className="container">
      <div className="navigation">
        <a href="/">Home</a>
        <a href="/admin">Admin Panel</a>
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        All Products ({products.length})
      </h1>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>No products found</h2>
          <p>Products will appear here once they are added through the admin panel.</p>
          <a href="/admin" className="btn">Go to Admin Panel</a>
        </div>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2 style={{ color: '#333', marginBottom: '15px' }}>{product.name}</h2>
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
                  href={`/product?hash=${product.hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
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
