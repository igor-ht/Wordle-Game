import { describe, expect, test } from '@jest/globals';
import { checkDbConnection } from '../models/db.client';

describe('Testing database connection', () => {
	test('Should return false for connection with database', () => {
		const res = checkDbConnection();
		expect(res).toBeFalsy();
	});
});
