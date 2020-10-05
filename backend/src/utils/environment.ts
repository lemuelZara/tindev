import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve('.env'),
});

export const { MONGO_USER } = process.env;
export const { MONGO_PASSWORD } = process.env;
export const { MONGO_DB } = process.env;
