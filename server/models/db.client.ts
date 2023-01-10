import { Pool, PoolConfig } from 'pg';

export let client: Pool;

export async function connectDataBase(DBconfig: PoolConfig) {
	if (!client) {
		client = new Pool(DBconfig);
		console.log('pg client created');
		await client.connect();
		console.log('pg client connected');
	} else {
		console.log('Already connected to Database.');
	}
}

export default function checkDbConnection() {
	if (!client) {
		throw 'You need to connect to database before calling this function';
	} else {
		return client;
	}
}
