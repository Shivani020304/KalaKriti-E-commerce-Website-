import "dotenv/config";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Attempting to connect to the Render PostgreSQL database...');
  
  try {
    const productCount = await prisma.product.count();
    const userCount = await prisma.user.count();
    
    console.log('✅ Connection Successful!');
    console.log(`📊 Current Database Stats:`);
    console.log(`   - Products in database: ${productCount}`);
    console.log(`   - Users in database: ${userCount}`);
    console.log('\nEverything is working perfectly!');
  } catch (error) {
    console.error('❌ Connection Failed. Error details:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
