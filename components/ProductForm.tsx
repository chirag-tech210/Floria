'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/app/actions/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface ProductFormProps {
  product?: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
  };
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [imageInput, setImageInput] = useState('');

  const isEditing = !!product;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('images', JSON.stringify(images));

      const result = isEditing
        ? await updateProduct(product._id, formData)
        : await createProduct(formData);

      if (result.success) {
        toast.success(isEditing ? 'Product updated successfully' : 'Product created successfully');
        router.push('/admin/products');
        router.refresh();
      } else {
        toast.error(result.message || `Failed to ${isEditing ? 'update' : 'create'} product`);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={product?.name}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              defaultValue={product?.description}
              required
              disabled={isLoading}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                defaultValue={product?.price}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                defaultValue={product?.stock}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              defaultValue={product?.category}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Images (URLs)</Label>
            <div className="flex gap-2">
              <Input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Enter image URL"
                disabled={isLoading}
              />
              <Button type="button" onClick={addImage} disabled={isLoading}>
                Add
              </Button>
            </div>
            {images.length > 0 && (
              <div className="space-y-2 mt-2">
                {images.map((img, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <span className="flex-1 text-sm truncate">{img}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                      disabled={isLoading}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
