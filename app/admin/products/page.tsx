import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getProducts } from '@/app/actions/products';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import DeleteProductButton from '@/components/DeleteProductButton';

export default async function AdminProductsPage() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const productsResult = await getProducts();
  const products = productsResult.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No products found.</p>
          <Link href="/admin/products/new">
            <Button>Add Your First Product</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <Card key={product._id}>
              <CardContent className="p-0">
                <div className="relative w-full h-48 bg-muted">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold mb-4">{formatPrice(product.price)}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p>Stock: {product.stock}</p>
                      <p>Category: {product.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${product._id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <DeleteProductButton productId={product._id} />
                    </div>
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
