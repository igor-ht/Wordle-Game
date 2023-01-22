import { ImportMock } from 'ts-mock-imports';
import * as DbModule from '../Models/db.client';

const MockClient: { query: any } = {
	query: null,
};

ImportMock.mockFunction(DbModule, 'default', MockClient);

import { UserDao } from '../Controllers/userController';
import { Pool } from 'pg';

describe('UserController testing', () => {
	let UserDB: UserDao;
	beforeEach(() => {
		UserDB = new UserDao(MockClient as Pool);
	});

	describe('CheckUserInDB', () => {
		test('CheckUserInDB - return true', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, email: 'user@test.com' }] });
			const res = await UserDB.checkUserInDB('user@test.com');
			expect(res).toBe(true);
			expect(res).toBeTruthy();
		});
		test('CheckUserInDB - return false', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await UserDB.checkUserInDB('user@test.com');
			expect(res).toBe(false);
			expect(res).toBeFalsy();
		});
	});

	describe('create', () => {
		test('create - return true', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await UserDB.create({
				name: 'User',
				email: 'user@test.com',
				password: 'abcdef',
				confirmpassword: 'abcdef',
			});
			expect(res).toBe(true);
			expect(res).toBeTruthy();
		});
		test('create - return false', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, name: 'User', email: 'user@test.com' }] });
			const res = await UserDB.create({
				name: 'User',
				email: 'user@test.com',
				password: 'abcdef',
				confirmpassword: 'abcdef',
			});
			expect(res).toBe(false);
			expect(res).toBeFalsy();
		});
	});

	describe('read', () => {
		test('read - return a row from DB', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, name: 'User', email: 'user@test.com' }] });
			const res = await UserDB.read(1);
			expect(res).toStrictEqual({ id: 1, name: 'User', email: 'user@test.com' });
		});
		test('read - returning undefined', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await UserDB.read(1);
			expect(res).toBe(undefined);
			expect(res).toBeFalsy();
		});
	});

	describe('update', () => {
		test('update - return updated row', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, name: 'User', email: 'user@test.com' }] });
			const res = await UserDB.update(1, {
				name: 'User',
				email: 'user@test.com',
				password: 'abcdef',
				confirmpassword: 'abcdef',
			});
			expect(res).toStrictEqual({ id: 1, name: 'User', email: 'user@test.com' });
		});
		test('update - return undefined', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await UserDB.update(1, {
				name: 'User',
				email: 'user@test.com',
				password: 'abcdef',
				confirmpassword: 'abcdef',
			});
			expect(res).toBe(undefined);
			expect(res).toBeFalsy();
		});
	});

	describe('delete', () => {
		test('delete - return true', async () => {
			MockClient.query = () => Promise.resolve({ rowCount: 0 });
			const res = await UserDB.delete(1);
			expect(res).toBe(true);
			expect(res).toBeTruthy();
		});
		test('delete - return false', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, name: 'User' }] });
			const res = await UserDB.delete(1);
			expect(res).toBe(false);
			expect(res).toBeFalsy();
		});
	});

	describe('find', () => {
		test('find - return row', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, name: 'User' }] });
			const res = await UserDB.find('user@test.com');
			expect(res).toStrictEqual({ id: 1, name: 'User' });
		});
		test('find - return undefined', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await UserDB.find('user@test.com');
			expect(res).toBe(undefined);
			expect(res).toBeFalsy();
		});
	});
});
