import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getOrders } from '@/app/actions/orders';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import UpdateOrderStatusButton from '@/components/UpdateOrderStatusButton';

export default async function AdminOrdersPage() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const ordersResult = await getOrders();
  const orders = ordersResult.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <Card key={order._id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        Order #{order._id.slice(-8)}
                      </Link>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.paymentStatus === 'COMPLETED'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : order.paymentStatus === 'FAILED'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.items.length} item(s)
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold">{formatPrice(order.total)}</p>
                    </div>
                    <UpdateOrderStatusButton orderId={order._id} currentStatus={order.paymentStatus} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
