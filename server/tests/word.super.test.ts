import { ImportMock } from 'ts-mock-imports';
import * as DbModule from '../Models/db.client';

const MockClient: { query: any } = {
	query: null,
};

// the replacement
ImportMock.mockFunction(DbModule, 'default', MockClient);

import { appServer } from '../src/server';
import request from 'supertest';
import { decryption, encryption } from '../Controllers/cryptoData';
import { MYKEY } from '../src/Word/wordRouter';

describe('WordRouter tests with Database', () => {
	describe('Post new word in DB test', () => {
		test('Post good new Word expect 200', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ word: 'tests' }] });

			const res = await request(appServer).post('/word/newWord').send({ word: 'tests' });
			expect(res.text).toBe('The new word was succesfully added to the database');
			expect(res.status).toBe(200);
		});

		test('Post bad new Word expect 404', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });

			const badres = await request(appServer).post('/word/newWord').send({ word: 't' });
			expect(badres.text).toBe('New word not valid.');
			expect(badres.status).toBe(404);
		});
	});

	test('Get random word', async () => {
		MockClient.query = () => Promise.resolve({ rows: [{ word: 'peace' }] });

		const res = await request(appServer).get('/word/randWord');
		expect(decryption(res.text, MYKEY)).toBe('peace');
		expect(res.status).toBe(200);
	});

	test('Get word by ID from DB', async () => {
		MockClient.query = () => Promise.resolve({ rows: [{ id: 1, word: 'tests' }] });

		const res = await request(appServer).get('/word/1');
		expect(res.body).toStrictEqual({ id: 1, word: 'tests' });
		expect(res.status).toBe(200);
	});

	test('Update Word from DB', async () => {
		MockClient.query = () => Promise.resolve({ rows: [{ id: 1, word: 'tests' }] });

		const res = await request(appServer).put('/word/updateWord').send({ id: 1, word: 'tests' });
		expect(res.body).toStrictEqual({ id: 1, word: 'tests' });
		expect(res.status).toBe(200);
	});

	test('Delete Word from DB', async () => {
		MockClient.query = () => Promise.resolve({ rows: [] });

		const res = await request(appServer).del('/word/deleteWord').send({ id: 1 });
		expect(res.body).toBeTruthy();
		expect(res.status).toBe(200);
	});

	test('Check user guess', async () => {
		const word = encryption('tests', MYKEY);
		const res = await request(appServer)
			.post('/word/checkGuess')
			.send({
				word: word,
				row: [
					{ inputId: 0, inputValue: 'T' },
					{ inputId: 1, inputValue: 'E' },
					{ inputId: 2, inputValue: 'S' },
					{ inputId: 3, inputValue: 'T' },
					{ inputId: 4, inputValue: 'S' },
				],
			});
		expect(res.body).toStrictEqual(['bull', 'bull', 'bull', 'bull', 'bull']);
	});
});
