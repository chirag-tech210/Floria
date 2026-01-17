// Test script to check products
import './load-env';
import connectDB from '../lib/mongodb';
import Product from '../models/Product';

async function testProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    const count = await Product.countDocuments();
    console.log(`📊 Total products in database: ${count}`);

    if (count > 0) {
      const products = await Product.find({}).limit(3);
      console.log('\n📦 Sample products:');
      products.forEach((p: any) => {
        console.log(`  - ${p.name} (${p.category}) - $${p.price}`);
      });
    } else {
      console.log('⚠️  No products found in database. Run: npm run seed');
    }

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testProducts();
