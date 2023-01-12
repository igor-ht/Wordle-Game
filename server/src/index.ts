import { connectDataBase } from '../models/db.client';
import { appServer } from './server';
import { serverConfig } from './serverConfig';
import { dbConfig } from './serverConfig';

async function startApp() {
	await connectDataBase(dbConfig);

	appServer.listen(serverConfig.port, serverConfig.host, () =>
		console.log(`AppServer listening on http://${serverConfig.host}:${serverConfig.port}`)
	);
}

// start the application
startApp().catch(console.log);
