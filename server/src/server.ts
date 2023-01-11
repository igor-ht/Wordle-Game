import express from 'express';
import cors from 'cors';
import { serverConfig } from './serverConfig';
import wordRouter from './word/wordRouter';
import userRouter from './users/userRouter';

export const appServer = express();

appServer.use(
	cors({
		origin: `http://${serverConfig.host}:${serverConfig.origin}`,
	})
);

// middleware express.json() substituted the bodyParser() library for bodyngParsing of POST method requests
appServer.use(express.json());

appServer.use(express.urlencoded({ extended: false }));

appServer.use('/word', wordRouter);

appServer.use('/user', userRouter);
