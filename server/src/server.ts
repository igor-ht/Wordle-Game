import express from 'express';
import cors from 'cors';
import config from './serverConfig';
import routes from './routes';
import '../models/db';

export const appServer = express();

appServer.use(cors({
  origin: `http://${config.host}:${config.origin}`
}));

appServer.use(express.json());
appServer.use(express.urlencoded({ extended: false }));

appServer.listen(config.port,config.host,  () => console.log(`AppServer listening on ${config.host}${config.port}`));

routes(appServer);