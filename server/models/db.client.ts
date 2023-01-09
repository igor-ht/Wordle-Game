import { Pool } from 'pg';
import { user, host, database, password } from './db.config';

export let client: Pool;

export function connectDataBase() {
	if (!checkDbConnection()) {
		client = new Pool({ user, host, database, password });
		console.log('pg client created');
		client.connect();
		console.log('pg client connected');
	} else {
		console.log('Could`t connect to database.');
	}
}

export function checkDbConnection() {
	if (!client) {
		return false;
	} else {
		return true;
	}
}
