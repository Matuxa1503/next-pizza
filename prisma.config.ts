import path from 'path';
import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';

// вручную подгружаем .env т.к. после добавления prisma.config.ts, prisma не видит переменные из .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: { seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts' },
});
