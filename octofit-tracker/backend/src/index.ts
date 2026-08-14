import dotenv from 'dotenv';
import { startServer } from './server';

dotenv.config();

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
