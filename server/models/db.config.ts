const host = process.env.APP_DB_HOST ?? 'localhost';
const user = process.env.APP_DB_USER ?? 'postgres';
const password = process.env.APP_DB_PASS ?? 'petagorda';
const database = process.env.APP_DB_DB ?? 'Wordle';

export const dbConfig = { host, user, password, database };
