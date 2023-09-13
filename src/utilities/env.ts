import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV !== 'development';
const appPort = parseInt(process.env.APP_PORT);
const databaseUser = process.env.DATABASE_USER;
const databasePass = process.env.DATABASE_PASS;
const databaseUrl = process.env.DATABASE_URL;

export { isProduction, appPort, databaseUser, databasePass, databaseUrl };
