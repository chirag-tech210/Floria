import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getCart } from '@/app/actions/cart';
import CheckoutForm from '@/components/CheckoutForm';

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login?redirect=/checkout');
  }

  const cartResult = await getCart();
  const cart = cartResult.data;

  if (!cart || !cart.items || cart.items.length === 0) {
    redirect('/cart');
  }

  const total = cart.items.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm cart={cart} total={total} />
    </div>
  );
}
