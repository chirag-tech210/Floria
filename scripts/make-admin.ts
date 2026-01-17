import './load-env';
import connectDB from '../lib/mongodb';
import User from '../models/User';

async function makeAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    const email = 'yadavchirag210@gmail.com';
    
    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 'ADMIN' },
      { new: true }
    );

    if (user) {
      console.log(`✅ Successfully updated user to ADMIN:`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
    } else {
      console.log(`❌ User with email ${email} not found.`);
      console.log('   Please create the user account first by signing up.');
    }

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();
