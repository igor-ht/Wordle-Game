import { ImportMock } from 'ts-mock-imports';
import * as DbModule from '../models/db.client';

const MockClient: { query: any } = {
	query: null,
};

ImportMock.mockFunction(DbModule, 'default', MockClient);

import { appServer } from '../src/server';
import request from 'supertest';

describe('UserRouter tests', () => {
	describe('Get user by email in Database', () => {
		test('Get user by email - success', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, name: 'User1', password: '123456' }] });

			const res = await request(appServer).get('/user/find/:user@test.com');
			expect(res.body).toStrictEqual({ id: 1, name: 'User1', password: '123456' });
			expect(res.status).toBe(200);
		});

		test('Get user by email - unsuccess', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });

			const res = await request(appServer).get('/user/find/:user@test.com');
			expect(res.status).toBe(400);
			expect(res.text).toBe('Email not found');
		});
	});

	describe('Get user by ID in Database', () => {
		test('Get user by ID - success', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, name: 'User1', password: '123456' }] });

			const res = await request(appServer).get('/user/:1');
			expect(res.body).toStrictEqual({ id: 1, name: 'User1', password: '123456' });
			expect(res.status).toBe(200);
		});

		test('Get user by id - unsuccess', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });

			const res = await request(appServer).get('/user/:2');
			expect(res.status).toBe(400);
			expect(res.text).toBe('User not found.');
		});
	});

	describe('Create new User in Database', () => {
		test('Create new User - success', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });

			const res = await request(appServer)
				.post('/user/create')
				.send({ name: 'User1', email: 'user@test.com', password: '123456', confirmpassword: '123456' });
			expect(res.text).toBe('User succesfully registered.');
			expect(res.status).toBe(200);
		});

		test('Create new User - unsuccessful', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ name: 'User1', email: 'user@test.com' }] });

			const res = await request(appServer).post('/user/create').send({ name: 'User1', email: 'user@test.com' });
			expect(res.text).toBe('User couldn`t be registered.');
			expect(res.status).toBe(400);
		});
	});

	describe('Update User in Database', () => {
		test('Update User - success', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, name: 'User1' }] });

			const res = await request(appServer)
				.put('/user/updateUser')
				.send({
					id: 1,
					newUser: { name: 'User1', email: 'user@test.com', password: 'abcdef', confirmpassword: 'abcdef' },
				});
			expect(res.body).toStrictEqual({ id: 1, name: 'User1' });
			expect(res.status).toBe(200);
		});

		test('Update User - unsuccess', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await request(appServer)
				.put('/user/updateUser')
				.send({ id: 1, newUser: { name: 'User1', email: 'user@test.com' } });
			expect(res.status).toBe(400);
			expect(res.text).toBe('Couldn`t update the user informations.');
		});
	});

	describe('Delete User from Database', () => {
		test('Delete User - success', async () => {
			MockClient.query = () => Promise.resolve({ rowCount: 0 });

			const res = await request(appServer).del('/user/deleteUser').send({ id: 1 });
			expect(res.status).toBe(200);
			expect(res.text).toBe('User deleted.');
		});

		test('Delete User - unsuccess', async () => {
			MockClient.query = () => Promise.resolve({ rowCount: 1 });

			const res = await request(appServer).delete('/user/deleteUser').send({ id: 1 });
			expect(res.status).toBe(400);
			expect(res.text).toBe('Action not completed. Try again later.');
		});
	});
});
