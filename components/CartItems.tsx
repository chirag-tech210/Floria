'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { updateCartItem, removeFromCart } from '@/app/actions/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CartItemsProps {
  cart: {
    items: Array<{
      _id: string;
      product: {
        _id: string;
        name: string;
        price: number;
        images: string[];
      };
      quantity: number;
    }>;
  };
}

export default function CartItems({ cart: initialCart }: CartItemsProps) {
  const router = useRouter();
  const [cart, setCart] = useState(initialCart);
  const [updating, setUpdating] = useState<string | null>(null);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      await handleRemoveItem(productId);
      return;
    }

    setUpdating(productId);
    const result = await updateCartItem(productId, quantity);

    if (result.success && result.data) {
      setCart(result.data);
      toast.success('Cart updated');
    } else {
      toast.error(result.message || 'Failed to update cart');
    }
    setUpdating(null);
  };

  const handleRemoveItem = async (productId: string) => {
    setUpdating(productId);
    const result = await removeFromCart(productId);

    if (result.success) {
      if (result.data) {
        setCart(result.data);
      } else {
        router.refresh();
      }
      toast.success('Item removed from cart');
    } else {
      toast.error(result.message || 'Failed to remove item');
    }
    setUpdating(null);
  };

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cart.items.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Link href={`/products/${item.product._id}`}>
                  <div className="relative w-24 h-24 bg-muted rounded-lg flex-shrink-0">
                    {item.product.images && item.product.images.length > 0 ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${item.product._id}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-primary mt-2">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                        disabled={updating === item.product._id}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                        disabled={updating === item.product._id}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.product._id)}
                      disabled={updating === item.product._id}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <Link href="/checkout" className="block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
