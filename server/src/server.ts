import express from 'express';
import cors from 'cors';
import { serverConfig } from './Config/serverConfig';
import wordRouter from './Word/wordRouter';
import userRouter from './Users/userRouter';

export const appServer = express();

appServer.use(
	cors({
		origin: `http://${serverConfig.host}:${serverConfig.origin}`,
	})
);

// middleware express.json() substituted the bodyParser() library for bodyngParsing of POST method requests
appServer.use(express.json());

appServer.use(express.urlencoded({ extended: false }));

appServer.use('/user', userRouter);

appServer.use('/word', wordRouter);
