const host = process.env.APP_SV_HOST ? this : 'localhost' as string;
const port = process.env.APP_SV_PORT ? this : 3000 as number;
const origin = process.env.APP_SV_ORIGIN ? this : 5000 as number;

export const serverConfig = { host, port, origin };
