'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { productSchema } from '@/lib/validations';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getProducts(filters?: {
  category?: string;
  search?: string;
  limit?: number;
}) {
  try {
    await connectDB();

    const query: any = {};

    if (filters?.category && filters.category !== 'all') {
      query.category = filters.category;
    }

    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }

    const limit = filters?.limit || 20;
    const products = await Product.find(query).limit(limit).sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(products)),
    };
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      message: error.message || 'Failed to fetch products',
      data: [],
    };
  }
}

export async function getProductById(productId: string) {
  try {
    await connectDB();

    const product = await Product.findById(productId);
    if (!product) {
      return {
        success: false,
        message: 'Product not found',
        data: null,
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(product)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to fetch product',
      data: null,
    };
  }
}

export async function getCategories() {
  try {
    await connectDB();
    const categories = await Product.distinct('category');
    return {
      success: true,
      data: categories,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to fetch categories',
      data: [],
    };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return {
        success: false,
        message: 'Unauthorized: Admin access required',
      };
    }

    const imagesStr = formData.get('images') as string || '[]';
    let images = [];
    try {
      images = JSON.parse(imagesStr);
    } catch {
      images = [];
    }

    const rawData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      stock: parseInt(formData.get('stock') as string),
      images: images,
    };

    const validatedData = productSchema.parse(rawData);

    await connectDB();

    const product = await Product.create(validatedData);

    revalidatePath('/products');
    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product created successfully',
      data: JSON.parse(JSON.stringify(product)),
    };
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.name === 'ZodError') {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation error',
      };
    }
    return {
      success: false,
      message: error.message || 'Failed to create product',
    };
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    const rawData: any = {};
    if (formData.get('name')) rawData.name = formData.get('name');
    if (formData.get('description')) rawData.description = formData.get('description');
    if (formData.get('price')) rawData.price = parseFloat(formData.get('price') as string);
    if (formData.get('category')) rawData.category = formData.get('category');
    if (formData.get('stock')) rawData.stock = parseInt(formData.get('stock') as string);
    if (formData.get('images')) rawData.images = JSON.parse(formData.get('images') as string);

    await connectDB();

    const product = await Product.findByIdAndUpdate(productId, rawData, { new: true, runValidators: true });

    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      };
    }

    revalidatePath('/products');
    revalidatePath(`/products/${productId}`);
    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product updated successfully',
      data: JSON.parse(JSON.stringify(product)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to update product',
    };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    await connectDB();

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      };
    }

    revalidatePath('/products');
    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to delete product',
    };
  }
}
