'use server';

import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { getCurrentUser } from '@/lib/auth';
import { checkoutSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function getOrders() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized',
        data: [],
      };
    }

    await connectDB();

    const query: any = { user: user.userId };
    if (user.role === 'ADMIN') {
      delete query.user; // Admin can see all orders
    }

    const orders = await Order.find(query)
      .populate('items.product')
      .sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to fetch orders',
      data: [],
    };
  }
}

export async function getOrderById(orderId: string) {
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

    const query: any = { _id: orderId };
    if (user.role !== 'ADMIN') {
      query.user = user.userId;
    }

    const order = await Order.findOne(query).populate('items.product');

    if (!order) {
      return {
        success: false,
        message: 'Order not found',
        data: null,
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(order)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to fetch order',
      data: null,
    };
  }
}

export async function createOrder(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    await connectDB();

    // Get cart
    const cart = await Cart.findOne({ user: user.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: 'Cart is empty',
      };
    }

    // Validate stock and calculate total
    let total = 0;
    const orderItems: any[] = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return {
          success: false,
          message: `Product ${item.product} not found`,
        };
      }

      if (product.stock < item.quantity) {
        return {
          success: false,
          message: `Insufficient stock for ${product.name}`,
        };
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Parse shipping address
    const shippingAddress = {
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
    };

    const validatedAddress = checkoutSchema.parse({ shippingAddress });

    // Simulate payment (always succeeds for demo)
    const paymentStatus = 'COMPLETED';
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create order
    const order = await Order.create({
      user: user.userId,
      items: orderItems,
      total,
      paymentStatus,
      paymentId,
      shippingAddress: validatedAddress.shippingAddress,
    });

    // Update product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    revalidatePath('/dashboard');
    revalidatePath('/orders');

    return {
      success: true,
      message: 'Order placed successfully',
      data: JSON.parse(JSON.stringify(order)),
    };
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }
    return {
      success: false,
      message: error.message || 'Failed to create order',
    };
  }
}

export async function updateOrderStatus(orderId: string, status: 'PENDING' | 'COMPLETED' | 'FAILED') {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    await connectDB();

    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: status },
      { new: true }
    );

    if (!order) {
      return {
        success: false,
        message: 'Order not found',
      };
    }

    revalidatePath('/admin/orders');
    revalidatePath('/dashboard');

    return {
      success: true,
      message: 'Order status updated',
      data: JSON.parse(JSON.stringify(order)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to update order status',
    };
  }
}
