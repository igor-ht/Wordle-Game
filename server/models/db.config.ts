const host = process.env.APP_DB_HOST! ? this : 'localhost';
const user = process.env.APP_DB_USER! ? this : 'postgres' as string;
const password = process.env.APP_DB_PASS! ? this : 'grunitech' as string;
const database = process.env.APP_DB_DB! ? this : 'Wordle';

export const dbConfig = { host, user, password, database };
