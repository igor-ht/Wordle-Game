import { connectDataBase } from '../Models/db.client';
import { appServer } from './server';
import { serverConfig } from './Config/serverConfig';
import { dbConfig } from './Config/serverConfig';

async function startApp() {
	await connectDataBase(dbConfig);

	appServer.listen(serverConfig.port, serverConfig.host, () =>
		console.log(`AppServer listening on http://${serverConfig.host}:${serverConfig.port}`)
	);
}

// start the application
startApp().catch(console.log);
