import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const connectionString = 
  process.env.POSTGRES_URL
  if (!connectionString) {
    throw new Error('No database connection string provided in environment variables.');
  }

const adapter = new PrismaPg({connectionString});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding the database');
  for (const account of config.defaultAccounts) {
    const role = account.role as Role || Role.USER;
    const password = await hash(account.password, 10);
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: { password, role },
      create: { email: account.email, password, role },
    });
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
