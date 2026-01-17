import './load-env';
import bcrypt from 'bcryptjs';
import connectDB from '../lib/mongodb';
import User from '../models/User';

async function updatePassword() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    const email = 'yadavchirag210@gmail.com';
    const newPassword = '12345678';
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    if (user) {
      console.log(`✅ Successfully updated password for user:`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password: ${newPassword}`);
    } else {
      console.log(`❌ User with email ${email} not found.`);
    }

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePassword();
