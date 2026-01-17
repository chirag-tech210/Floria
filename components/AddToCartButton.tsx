'use client';

import { useState } from 'react';
import { addToCart } from '@/app/actions/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  productId: string;
  stock: number;
}

export default function AddToCartButton({ productId, stock }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (quantity < 1 || quantity > stock) {
      toast.error('Invalid quantity');
      return;
    }

    setIsLoading(true);
    const result = await addToCart(productId, quantity);

    if (result.success) {
      toast.success('Product added to cart');
      setQuantity(1);
    } else {
      toast.error(result.message || 'Failed to add product to cart');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity:
        </label>
        <Input
          id="quantity"
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-20"
          disabled={isLoading || stock === 0}
        />
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={isLoading || stock === 0}
        size="lg"
        className="flex-1"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  );
}
