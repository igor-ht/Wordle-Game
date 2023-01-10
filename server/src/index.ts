import { connectDataBase } from '../models/db.client';
import { appServer } from './server';
import { serverConfig } from './serverConfig';
import { dbConfig } from '../models/db.config';
import dotenv from 'dotenv';

async function startApp() {
	await connectDataBase(dbConfig);

	appServer.listen(serverConfig.port!, serverConfig.host!, () =>
		console.log(`AppServer listening on http://${serverConfig.host}:${serverConfig.port}`)
	);
}

// start the application
dotenv.config();
startApp().catch(console.log);
