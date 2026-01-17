import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, Plus } from 'lucide-react';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/products">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Package className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Manage Products</CardTitle>
              <CardDescription>
                View, add, edit, and delete products
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/orders">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <ShoppingBag className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Manage Orders</CardTitle>
              <CardDescription>
                View and update order statuses
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
