import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import ProductForm from '@/components/ProductForm';

export default async function NewProductPage() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
