import { NextRequest, NextResponse } from 'next/server';
import { addProduct, getAllProducts, clearAllProducts } from '@/lib/server-storage';

// GET /api/products - Get all products
export async function GET() {
  try {
    const products = getAllProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Add a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    // Validate input
    if (!name || !description) {
      return NextResponse.json(
        { success: false, error: 'Name and description are required' },
        { status: 400 }
      );
    }

    if (name.length < 5 || description.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Name and description must be at least 5 characters long' },
        { status: 400 }
      );
    }

    const product = addProduct(name, description);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products - Clear all products (for testing)
export async function DELETE() {
  try {
    clearAllProducts();
    return NextResponse.json({ success: true, message: 'All products cleared' });
  } catch (error) {
    console.error('Error clearing products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear products' },
      { status: 500 }
    );
  }
}
