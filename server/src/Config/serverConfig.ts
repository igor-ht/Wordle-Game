import dotenv from 'dotenv';
dotenv.config();

const host = process.env.APP_SV_HOST as string;
const port = Number(process.env.APP_SV_PORT as string);
const origin = process.env.APP_SV_ORIGIN as string;

const PASS_KEY = process.env.APP_MYKEY_PASS as string;
const WORD_KEY = process.env.APP_MYKEY_WORD as string;
const JWT_KEY = process.env.APP_MYKEY_JWT as string;
const JWT_REFRESH_KEY = process.env.APP_MYKEY_JWT_REFRESH as string;

const dbhost = process.env.APP_DB_HOST as string;
const database = process.env.APP_DB_DB as string;
const user = process.env.APP_DB_USER as string;
const password = process.env.APP_DB_PASS as string;

export const dbConfig = { dbhost, user, password, database };

export const serverConfig = { host, port, origin, PASS_KEY, WORD_KEY, JWT_KEY, JWT_REFRESH_KEY };
