import express from 'express';
import cors from 'cors';
import config from './serverConfig';
import '../models/db.client';
import wordRouter from './wordRouter';
import userRouter from './userRouter';

export const appServer = express();

appServer.use(
	cors({
		origin: `http://${config.host}:${config.origin}`,
	})
);

// middleware express.json() substituted the bodyParser() library for bodyngParsing of POST method requests
appServer.use(express.json());

appServer.use(express.urlencoded({ extended: false }));

appServer.use('/word', wordRouter);

appServer.use('/user', userRouter);

appServer.listen(config.port, config.host, () =>
	console.log(`AppServer listening on http://${config.host}:${config.port}`)
);
