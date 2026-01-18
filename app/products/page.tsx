import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getCategories } from '@/app/actions/products';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Flower2 } from 'lucide-react';

interface SearchParams {
  category?: string;
  search?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const productsResult = await getProducts({
    category: params.category,
    search: params.search,
  });
  const categoriesResult = await getCategories();

  const products = productsResult.data || [];
  const categories = categoriesResult.data || [];

  if (!productsResult.success) {
    console.error('Products fetch error:', productsResult.message);
  }

  return (
    <div className="relative">
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&h=800&fit=crop&q=90"
            alt="Flower Garden"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
              <Flower2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
              Our Flower Collection
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-lg">
            Discover our exquisite selection of fresh blooms, handpicked for their beauty and freshness
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        {!productsResult.success && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 font-medium">Error: {productsResult.message}</p>
          </div>
        )}

        <Card className="mb-10 shadow-xl border-2 border-green-100 dark:border-green-900 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Filter Products</h2>
            </div>
            <form method="get" className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  name="search"
                  placeholder="Search for flowers, bouquets, or arrangements..."
                  defaultValue={params.search}
                  className="pl-12 h-12 border-2 border-green-200 dark:border-green-800 focus:border-green-500 dark:focus:border-green-400 rounded-lg"
                />
              </div>
              <Select 
                name="category" 
                defaultValue={params.category || 'all'}
                className="h-12 border-2 border-green-200 dark:border-green-800 focus:border-green-500 dark:focus:border-green-400 rounded-lg"
              >
                <option value="all">All Categories</option>
                {categories.map((cat: string) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
              <Button 
                type="submit" 
                className="h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg px-8"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </form>
            {(params.search || params.category) && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {params.search && (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      Search: {params.search}
                    </span>
                  )}
                  {params.category && params.category !== 'all' && (
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                      Category: {params.category}
                    </span>
                  )}
                  <Link href="/products" className="text-sm text-green-600 dark:text-green-400 hover:underline">
                    Clear all
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading beautiful flowers...</p>
            </div>
          </div>
        }>
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white/50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <Flower2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No flowers found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Link href="/products">
                <Button variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50">
                  View All Products
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{products.length}</span> beautiful flower arrangements
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}
