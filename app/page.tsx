import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flower2, Truck, Shield, Heart, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col relative overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1920&h=1080&fit=crop&q=90"
            alt="Flower Garden"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30">
                <Flower2 className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-white drop-shadow-2xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-green-300 via-white to-green-300 bg-clip-text text-transparent">
                Floria
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Where every petal tells a story. Discover our exquisite collection of fresh flowers, 
              carefully curated from the finest gardens around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-2xl px-8 py-6 text-lg font-semibold"
                >
                  <span>Explore Our Garden</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-700 backdrop-blur-sm px-8 py-6 text-lg font-semibold bg-white/10"
                >
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Why Choose Floria?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner in bringing natural beauty to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all hover:shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30">
                <Image
                  src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=400&fit=crop&q=80"
                  alt="Fresh Flowers"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-3">
                  <Flower2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-green-800 dark:text-green-300">Fresh Flowers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Handpicked fresh blooms from local farms, delivered at peak freshness with care
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all hover:shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-800/30">
                <Image
                  src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&h=400&fit=crop&q=80"
                  alt="Fast Delivery"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-3">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-green-800 dark:text-green-300">Same-Day Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Fast and reliable delivery service ensuring your flowers arrive fresh and vibrant
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transition-all hover:shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30">
                <Image
                  src="https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600&h=400&fit=crop&q=80"
                  alt="Guaranteed Fresh"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-red-800 dark:text-red-300">Guaranteed Fresh</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  100% satisfaction guarantee. If you're not happy, we'll make it right, no questions asked
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transition-all hover:shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-pink-100 to-red-200 dark:from-pink-900/30 dark:to-red-800/30">
                <Image
                  src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=600&h=400&fit=crop&q=80"
                  alt="Made with Love"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-red-800 dark:text-red-300">Made with Love</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every arrangement is carefully crafted with passion, attention to detail, and love
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&h=1080&fit=crop&q=90"
            alt="Flower Garden"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Nature's Beauty
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
              Step into our garden of wonders. Each flower is a masterpiece, 
              carefully selected to bring joy and elegance to your special moments.
            </p>
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-6 text-lg shadow-2xl"
              >
                <Flower2 className="w-5 h-5 mr-2" />
                <span>Browse Our Collection</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 bg-gradient-to-br from-green-50 via-white to-red-50 dark:from-green-950/20 dark:via-gray-900 dark:to-red-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-green-600 to-red-600 rounded-full mb-6">
              <Flower2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Ready to Brighten Someone's Day?
            </h2>
            <p className="text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy customers who trust Floria for their flower needs. 
              Browse our collection and find the perfect blooms for every occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl px-8 py-6 text-lg font-semibold"
                >
                  <Flower2 className="w-5 h-5 mr-2" />
                  <span>Shop Now</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 px-8 py-6 text-lg font-semibold"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
