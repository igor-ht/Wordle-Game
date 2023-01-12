import dotenv from 'dotenv';
dotenv.config();

const host = process.env.APP_SV_HOST!;
const port = +process.env.APP_SV_PORT!;
const origin = +process.env.APP_SV_ORIGIN!;

const PASS_KEY = process.env.APP_MYKEY_PASS!;
const WORD_KEY = process.env.APP_MYKEY_WORD!;

const dbhost = process.env.APP_DB_HOST!;
const database = process.env.APP_DB_DB!;
const user = process.env.APP_DB_USER!;
const password = process.env.APP_DB_PASS!;

export const dbConfig = { dbhost, user, password, database };

export const serverConfig = { host, port, origin, PASS_KEY, WORD_KEY };
