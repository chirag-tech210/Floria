// IMPORTANT: Load env before anything else
import './load-env';

import connectDB from '../lib/mongodb';
import Product from '../models/Product';

const flowerProducts = [
  {
    name: "Red Rose Bouquet",
    description: "A classic bouquet of 12 long-stemmed red roses, symbolizing love and passion. Perfect for anniversaries, Valentine's Day, or expressing your deepest emotions.",
    price: 49.99,
    category: "Roses",
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Sunflower Bouquet",
    description: "Bright and cheerful sunflowers that bring sunshine into any room. This vibrant arrangement includes 10 fresh sunflowers with seasonal greenery.",
    price: 39.99,
    category: "Summer Flowers",
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1597848212624-e593b98b8c9a?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Lavender Field Bouquet",
    description: "A fragrant arrangement of purple lavender stems that fill the air with a calming aroma. Includes 15 stems with beautiful purple blooms.",
    price: 34.99,
    category: "Herbs & Aromatics",
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1518621012428-5ec34a64c9f5?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Tulip Mix Bouquet",
    description: "A colorful mix of 15 tulips in various shades including pink, yellow, purple, and red. These spring favorites are perfect for brightening any space.",
    price: 42.99,
    category: "Spring Flowers",
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "White Orchid Plant",
    description: "Elegant white orchid in a decorative pot. This sophisticated plant makes a perfect gift and can bloom for months with proper care.",
    price: 59.99,
    category: "Plants",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Pink Peony Bouquet",
    description: "Luxurious peony arrangement with 10 large, fragrant blooms in soft pink and white. These romantic flowers are perfect for weddings and special occasions.",
    price: 64.99,
    category: "Luxury Flowers",
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Mixed Wildflower Bouquet",
    description: "A rustic arrangement of seasonal wildflowers including daisies, asters, and eucalyptus. Perfect for a natural, garden-fresh look.",
    price: 37.99,
    category: "Wildflowers",
    stock: 55,
    images: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "White Calla Lily Arrangement",
    description: "Sleek and modern calla lily bouquet with 8 elegant white blooms. A sophisticated choice for formal events and contemporary spaces.",
    price: 54.99,
    category: "Luxury Flowers",
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Red Carnation Bouquet",
    description: "Colorful carnation bouquet with 20 stems in assorted red and pink colors. These long-lasting flowers are perfect for birthdays and celebrations.",
    price: 29.99,
    category: "Carnations",
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Gerbera Daisy Bouquet",
    description: "Bright and cheerful gerbera daisies in vibrant red, orange, and yellow colors. This arrangement includes 12 large blooms that bring joy to any recipient.",
    price: 39.99,
    category: "Summer Flowers",
    stock: 42,
    images: [
      "https://images.unsplash.com/photo-1597848212624-e593b98b8c9a?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Baby's Breath Bouquet",
    description: "Delicate cloud of baby's breath flowers. Perfect for adding texture to arrangements or as a standalone delicate white bouquet.",
    price: 24.99,
    category: "Filler Flowers",
    stock: 70,
    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1518621012428-5ec34a64c9f5?w=1200&h=1200&fit=crop&q=85"
    ],
  },
  {
    name: "Hydrangea Centerpiece",
    description: "Lush hydrangea arrangement perfect for centerpieces. Includes 5 large blooms in blue, white, and green, creating a stunning display.",
    price: 69.99,
    category: "Luxury Flowers",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=1200&h=1200&fit=crop&q=85",
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?w=1200&h=1200&fit=crop&q=85"
    ],
  },
];

async function seedProducts() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert flower products
    const inserted = await Product.insertMany(flowerProducts);
    console.log(`✅ Successfully seeded ${inserted.length} flower products!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
