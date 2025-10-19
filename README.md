# Taarifa Product Management System

A React Next.js application for managing products with QR codes and barcodes. The system includes authentication, product management, and public product viewing capabilities.

## Features

### Page 1 - Login & Admin Panel
- **Login System**: Secure login with credentials `info@taarifa.com` / `Test123`
- **Auto-fill Button**: Convenient button to auto-populate login credentials
- **Product Form**: Add products with ID, Name, Description (Hash auto-generated)
- **In-memory Storage**: Products stored in memory during session
- **Product Management**: View all added products with their details

### Page 2 - Product Display
- **Public Access**: No authentication required
- **Hash-based URLs**: Access products via `/product?hash=[hash]` URLs
- **Error Handling**: Shows big red X and "Invalid Code" message for non-existent hashes
- **Product Details**: Displays all product information in a clean format

### Page 3 - Product List with QR/Barcodes
- **Public Access**: No authentication required
- **QR Code Generation**: Each product gets a QR code linking to its detail page
- **Barcode Generation**: Each product gets a barcode with the product ID
- **Sticker Format**: QR codes and barcodes displayed in sticker-like format
- **Mobile-friendly**: QR codes can be scanned with mobile cameras

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **QR Code Generation**: `qrcode` library
- **Barcode Generation**: `jsbarcode` library
- **Hash Generation**: `crypto-js` for SHA256 hashing
- **In-memory Storage**: Custom storage utility

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### GitHub Pages Deployment

The app is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** - The workflow will automatically deploy
2. **Access your app** at `https://[your-username].github.io/Taarifa/`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Usage

1. **Login**: Use the auto-fill button or manually enter:
   - Username: `info@taarifa.com`
   - Password: `Test123`

2. **Add Products**: Fill in the product form with ID, Name, and Description

3. **View Products**: 
   - Admin panel shows all products
   - Public page at `/products` shows QR codes and barcodes
   - Individual product pages at `/product?hash=[hash]`

4. **QR Code Scanning**: Use your mobile camera to scan QR codes, which will open the product detail page

## Project Structure

```
├── app/
│   ├── admin/           # Admin panel with product form
│   ├── product/         # Individual product display page (uses query params)
│   ├── products/        # Public product list with QR/barcodes
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Login page
├── lib/
│   └── storage.ts       # In-memory storage utilities
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## Key Features

- **Secure Authentication**: Login system with auto-fill convenience
- **Auto-generated Hashes**: Unique product identifiers using SHA256
- **QR Code Integration**: Mobile-friendly product access
- **Barcode Support**: Traditional barcode generation
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on desktop and mobile devices
- **Public Access**: Product viewing without authentication

## Development

- **TypeScript**: Full type safety throughout the application
- **Modern React**: Uses React 18 with hooks and functional components
- **Next.js App Router**: Latest Next.js routing system
- **CSS Modules**: Scoped styling with global utility classes

## Notes

- Products are stored in memory and will be lost on server restart
- QR codes link to the current domain (works in production)
- Barcodes use CODE128 format with product ID
- All pages are responsive and mobile-friendly
