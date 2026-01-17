import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getOrderById } from '@/app/actions/orders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  const { id } = await params;
  const result = await getOrderById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const order = result.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-semibold">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment ID</p>
              <p className="font-semibold">{order.paymentId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p
                className={`font-semibold ${
                  order.paymentStatus === 'COMPLETED'
                    ? 'text-green-600'
                    : order.paymentStatus === 'FAILED'
                    ? 'text-destructive'
                    : 'text-yellow-600'
                }`}
              >
                {order.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-semibold">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{formatPrice(order.total)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex gap-4 items-center border-b pb-4 last:border-0">
                <div className="relative w-20 h-20 bg-muted rounded-lg flex-shrink-0">
                  {item.product?.images && item.product.images.length > 0 ? (
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
                <div className="flex-1">
                  <p className="font-semibold">{item.product?.name || 'Product'}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
