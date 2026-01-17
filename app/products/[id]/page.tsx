import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/app/actions/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/AddToCartButton';
import { ShoppingCart } from 'lucide-react';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getProductById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const product = result.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-[500px] bg-muted rounded-lg">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-4">
              {formatPrice(product.price)}
            </p>
            {product.stock === 0 ? (
              <p className="text-destructive font-semibold">Out of Stock</p>
            ) : (
              <p className="text-muted-foreground">
                {product.stock} in stock
              </p>
            )}
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {product.description}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <p className="font-semibold">Category: {product.category}</p>
            <AddToCartButton productId={product._id} stock={product.stock} />
          </div>
        </div>
      </div>
    </div>
  );
}
