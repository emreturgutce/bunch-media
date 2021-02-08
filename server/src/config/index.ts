import dotenv from 'dotenv';
import Ajv from 'ajv';

dotenv.config();

export const ajv = new Ajv()

export const { NODE_ENV, MONGODB_URI, PORT } = process.env;
