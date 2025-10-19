import './globals.css'

export const metadata = {
  title: 'Taarifa Product Management',
  description: 'Product management system with QR codes and barcodes',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
