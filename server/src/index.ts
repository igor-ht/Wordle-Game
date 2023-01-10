import { connectDataBase } from '../models/db.client';
import { appServer } from './server';
import config from './serverConfig';
import '../models/db.config';
import { dbConfig } from '../models/db.config';

async function startApp() {
	await connectDataBase(dbConfig);

	appServer.listen(config.port, config.host, () =>
		console.log(`AppServer listening on http://${config.host}:${config.port}`)
	);
}

// start the application
startApp().catch(console.log);
