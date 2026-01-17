import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/products">
        <Button>Browse Products</Button>
      </Link>
    </div>
  );
}
