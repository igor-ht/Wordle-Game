const host = process.env.APP_SV_HOST! ? this : 'localhost';
const port = process.env.APP_SV_PORT! ? this : 5000;
const origin = process.env.APP_SV_ORIGIN! ? this : 3000;

export const serverConfig = { host, port, origin };
