import { NextRequest, NextResponse } from 'next/server';
import { getProductByHash } from '@/lib/server-storage';

// GET /api/products/[hash] - Get a product by hash
export async function GET(
  request: NextRequest,
  { params }: { params: { hash: string } }
) {
  try {
    const { hash } = params;
    
    if (!hash) {
      return NextResponse.json(
        { success: false, error: 'Hash parameter is required' },
        { status: 400 }
      );
    }

    const product = getProductByHash(hash);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product by hash:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
