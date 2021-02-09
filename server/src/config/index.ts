import dotenv from 'dotenv';
import Ajv from 'ajv';

dotenv.config();

export const ajv = new Ajv();
export * from './redis';
export * from './session';
export const {
	NODE_ENV,
	MONGODB_URI,
	PORT,
	REDIS_HOST,
	REDIS_PASSWORD,
	REDIS_PORT,
	SESSION_SECRET,
	JWT_SECRET,
} = process.env;
