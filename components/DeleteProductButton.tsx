'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/app/actions/products';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteProductButtonProps {
  productId: string;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setIsLoading(true);
    const result = await deleteProduct(productId);

    if (result.success) {
      toast.success('Product deleted successfully');
      router.refresh();
    } else {
      toast.error(result.message || 'Failed to delete product');
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={isLoading}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
