import { describe, expect, test } from '@jest/globals';
import checkDbConnection from '../models/db.client';

describe('Testing database connection', () => {
	test('Should throw for checking connection with database', () => {
		expect(() => checkDbConnection()).toThrow('You need to connect to database before calling this function');
	});
});
