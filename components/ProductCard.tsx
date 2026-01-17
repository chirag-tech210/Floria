'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { addToCart } from '@/app/actions/cart';
import { toast } from 'sonner';
import { ShoppingCart, Flower2 } from 'lucide-react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    stock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = await addToCart(product._id, 1);
    
    if (result.success) {
      toast.success('Product added to cart');
    } else {
      toast.error(result.message || 'Failed to add product to cart');
    }
  };

  return (
    <Link href={`/products/${product._id}`}>
      <Card className="h-full flex flex-col hover:shadow-xl transition-all border-2 hover:border-green-300 dark:hover:border-green-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <CardHeader className="p-0">
          <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-gray-900 overflow-hidden rounded-t-lg">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Flower2 className="w-16 h-16 text-green-300 dark:text-green-700" />
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-5">
          <h3 className="font-bold text-xl mb-2 line-clamp-1 text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </p>
            {product.stock > 0 && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                {product.stock} in stock
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
