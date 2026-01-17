'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Moon, Sun, Menu, X, User, LogOut, Flower2 } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { logout } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const itemCount = useCartStore((state) => state.getItemCount());
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetchUser();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-md shadow-lg border-b border-green-200/50 dark:border-green-900/50' 
        : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-green-200 dark:border-green-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="text-2xl font-bold flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <Flower2 className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-red-600 dark:from-green-400 dark:to-red-400 bg-clip-text text-transparent font-extrabold">
              Floria
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/products" 
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Products
            </Link>
            {user && (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Dashboard
                </Link>
                {user.role === 'ADMIN' && (
                  <Link 
                    href="/admin" 
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
            
            <Link 
              href="/cart" 
              className="relative p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  {itemCount}
                </span>
              )}
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </Button>

            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout}
                  className="rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    className="rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 text-gray-700 dark:text-gray-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-6 pt-4 space-y-2 border-t border-gray-200 dark:border-gray-800 mt-4">
            <Link
              href="/products"
              className="block py-3 px-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="block py-3 px-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="block py-3 px-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
            {user ? (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between py-3 px-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600">
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
