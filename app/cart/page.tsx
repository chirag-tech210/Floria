import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getCart } from '@/app/actions/cart';
import CartItems from '@/components/CartItems';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export default async function CartPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login?redirect=/cart');
  }

  const cartResult = await getCart();
  const cart = cartResult.data;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Start adding items to your cart to see them here.
        </p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <CartItems cart={cart} />
    </div>
  );
}
