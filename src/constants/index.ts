import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'axis_secret',
};

export const postgresConstants = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  test_port: process.env.POSTGRES_TEST_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

export const env = process.env.NODE_ENV;
export const serveFilePath = process.env.SERVE_FILE_PATH;
