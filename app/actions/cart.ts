'use server';

import connectDB from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getCart() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized',
        data: null,
      };
    }

    await connectDB();

    let cart = await Cart.findOne({ user: user.userId }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: user.userId, items: [] });
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(cart)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to fetch cart',
      data: null,
    };
  }
}

export async function addToCart(productId: string, quantity: number = 1) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    await connectDB();

    // Verify product exists and has stock
    const product = await Product.findById(productId);
    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      };
    }

    if (product.stock < quantity) {
      return {
        success: false,
        message: 'Insufficient stock',
      };
    }

    let cart = await Cart.findOne({ user: user.userId });

    if (!cart) {
      cart = await Cart.create({
        user: user.userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item: any) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        const newQuantity = cart.items[existingItemIndex].quantity + quantity;
        if (newQuantity > product.stock) {
          return {
            success: false,
            message: 'Insufficient stock',
          };
        }
        cart.items[existingItemIndex].quantity = newQuantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    revalidatePath('/cart');

    return {
      success: true,
      message: 'Item added to cart',
      data: JSON.parse(JSON.stringify(cart)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to add item to cart',
    };
  }
}

export async function updateCartItem(productId: string, quantity: number) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    if (quantity <= 0) {
      return await removeFromCart(productId);
    }

    await connectDB();

    const product = await Product.findById(productId);
    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      };
    }

    if (product.stock < quantity) {
      return {
        success: false,
        message: 'Insufficient stock',
      };
    }

    const cart = await Cart.findOne({ user: user.userId });
    if (!cart) {
      return {
        success: false,
        message: 'Cart not found',
      };
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return {
        success: false,
        message: 'Item not found in cart',
      };
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    revalidatePath('/cart');

    return {
      success: true,
      message: 'Cart updated',
      data: JSON.parse(JSON.stringify(cart)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to update cart',
    };
  }
}

export async function removeFromCart(productId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    await connectDB();

    const cart = await Cart.findOne({ user: user.userId });
    if (!cart) {
      return {
        success: false,
        message: 'Cart not found',
      };
    }

    cart.items = cart.items.filter(
      (item: any) => item.product.toString() !== productId
    );

    await cart.save();

    revalidatePath('/cart');

    return {
      success: true,
      message: 'Item removed from cart',
      data: JSON.parse(JSON.stringify(cart)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to remove item from cart',
    };
  }
}

export async function clearCart() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    await connectDB();

    const cart = await Cart.findOne({ user: user.userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    revalidatePath('/cart');

    return {
      success: true,
      message: 'Cart cleared',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to clear cart',
    };
  }
}
