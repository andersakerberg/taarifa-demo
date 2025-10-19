# NGROK Setup Guide

This guide explains how to use ngrok to expose your Taarifa Product Management System for testing, development, and sharing with others.

## What is NGROK?

NGROK is a tool that creates secure tunnels to your localhost, allowing you to:
- Share your local development server with others
- Test webhooks and APIs from external services
- Access your app from mobile devices on the same network
- Test QR codes and mobile camera functionality

## Prerequisites

1. **Node.js and npm** installed
2. **NGROK account** (free tier available)
3. **Taarifa app** running locally

## Installation

### 1. Create NGROK Account

1. Go to [https://ngrok.com](https://ngrok.com)
2. Sign up for a free account
3. Verify your email address

### 2. Install NGROK

**Option A: Download Binary (Recommended)**
1. Go to [https://ngrok.com/download](https://ngrok.com/download)
2. Download the appropriate version for your OS
3. Extract and place in your PATH

**Option B: Package Manager**

**macOS (Homebrew):**
```bash
brew install ngrok/ngrok/ngrok
```

**Windows (Chocolatey):**
```bash
choco install ngrok
```

**Linux (Snap):**
```bash
sudo snap install ngrok
```

### 3. Authenticate NGROK

1. Get your authtoken from [https://dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)
2. Run the authentication command:
```bash
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

## Usage

### 1. Start Your Next.js App

First, make sure your Taarifa app is running locally:

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

Your app should be running at `http://localhost:3000`

### 2. Start NGROK Tunnel

Open a new terminal window and run:

```bash
# Basic tunnel (free tier)
ngrok http 3000

# With custom subdomain (paid feature)
ngrok http 3000 --subdomain=taarifa-demo

# With custom domain (paid feature)
ngrok http 3000 --hostname=taarifa.yourdomain.com
```

### 3. Access Your App

NGROK will display output similar to:

```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       45ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
Forwarding                    http://abc123.ngrok.io -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Your app is now accessible at:
- **HTTPS**: `https://abc123.ngrok.io`
- **HTTP**: `http://abc123.ngrok.io`

## Testing Features

### 1. QR Code Testing

1. **Access the products page**: `https://abc123.ngrok.io/products`
2. **Add a product** through the admin panel: `https://abc123.ngrok.io/admin`
3. **Scan QR codes** with your mobile device
4. **Verify mobile access** to product pages

### 2. Mobile Testing

1. **Share the ngrok URL** with others
2. **Test on different devices** (phones, tablets)
3. **Test QR code scanning** with mobile cameras
4. **Verify responsive design** on various screen sizes

### 3. Webhook Testing

If you plan to add webhooks or external integrations:

```bash
# Start ngrok with webhook inspection
ngrok http 3000 --log=stdout
```

## NGROK Web Interface

Access the NGROK web interface at `http://127.0.0.1:4040` to:
- View request/response details
- Replay requests
- Inspect headers and payloads
- Monitor traffic

## Configuration Options

### 1. Custom Configuration File

Create `~/.ngrok2/ngrok.yml` (or `%USERPROFILE%\.ngrok2\ngrok.yml` on Windows):

```yaml
version: "2"
authtoken: YOUR_AUTHTOKEN_HERE
tunnels:
  taarifa:
    proto: http
    addr: 3000
    subdomain: taarifa-demo
    inspect: true
```

Then start with:
```bash
ngrok start taarifa
```

### 2. Environment Variables

Set up environment variables for easier management:

```bash
# Add to your shell profile (.bashrc, .zshrc, etc.)
export NGROK_AUTHTOKEN="your_authtoken_here"
export NGROK_SUBDOMAIN="taarifa-demo"
```

## Troubleshooting

### Common Issues

1. **"tunnel not found" error**
   - Check if your Next.js app is running on port 3000
   - Verify the port number in the ngrok command

2. **"authtoken not found" error**
   - Run `ngrok config add-authtoken YOUR_TOKEN`
   - Check your authtoken in the dashboard

3. **"subdomain already taken" error**
   - Use a different subdomain
   - Upgrade to paid plan for reserved subdomains

4. **QR codes not working**
   - Ensure you're using the HTTPS URL for QR codes
   - Check that the app is accessible from mobile devices

### Debug Mode

Run ngrok with verbose logging:

```bash
ngrok http 3000 --log=stdout --log-level=debug
```

## Security Considerations

1. **HTTPS URLs**: Always use HTTPS URLs for QR codes and sharing
2. **Temporary URLs**: Free ngrok URLs change on restart
3. **Public Access**: Anyone with the URL can access your app
4. **Sensitive Data**: Don't use ngrok for production with sensitive data

## Advanced Usage

### 1. Multiple Tunnels

```bash
# Start multiple tunnels
ngrok start --all
```

### 2. Custom Headers

```bash
# Add custom headers
ngrok http 3000 --host-header=rewrite
```

### 3. Basic Auth

```bash
# Add basic authentication
ngrok http 3000 --basic-auth="username:password"
```

## Integration with Development Workflow

### 1. Package.json Scripts

Add ngrok scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "tunnel": "ngrok http 3000",
    "dev:tunnel": "concurrently \"npm run dev\" \"npm run tunnel\""
  }
}
```

### 2. Environment Configuration

Create `.env.local` for ngrok-specific settings:

```env
NGROK_URL=https://your-subdomain.ngrok.io
NEXT_PUBLIC_APP_URL=https://your-subdomain.ngrok.io
```

## Best Practices

1. **Use HTTPS URLs** for all external sharing
2. **Test QR codes** with actual mobile devices
3. **Monitor the web interface** for debugging
4. **Use descriptive subdomains** for easy identification
5. **Keep authtoken secure** and don't commit it to version control

## Free vs Paid Plans

### Free Plan
- ✅ 1 tunnel at a time
- ✅ Random subdomains
- ✅ Basic features
- ❌ Custom subdomains
- ❌ Reserved domains

### Paid Plans
- ✅ Multiple tunnels
- ✅ Custom subdomains
- ✅ Reserved domains
- ✅ Advanced features
- ✅ Better performance

## Conclusion

NGROK is an excellent tool for testing your Taarifa app with real mobile devices and sharing it with others. The QR code functionality works perfectly with ngrok URLs, making it ideal for testing the complete user experience.

For production deployment, use the GitHub Pages setup as described in [DEPLOYMENT.md](./DEPLOYMENT.md).
