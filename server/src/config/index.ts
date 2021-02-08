import dotenv from 'dotenv';

dotenv.config();

export const { NODE_ENV, MONGODB_URI, PORT } = process.env;
