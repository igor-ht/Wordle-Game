import { ImportMock } from 'ts-mock-imports';
import * as DbModule from '../Models/db.client';

const MockClient: { query: any } = {
	query: null,
};

ImportMock.mockFunction(DbModule, 'default', MockClient);

import { WordDao } from '../Controllers/wordController';
import { Pool } from 'pg';

describe('WordController methods testing', () => {
	let wordDB: WordDao;
	beforeEach(() => {
		wordDB = new WordDao(MockClient as Pool);
	});

	describe('Create', () => {
		test('Create - return true', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, word: 'tests' }] });
			const res = await wordDB.create({ word: 'tests' });
			expect(res).toBe(true);
			expect(res).toBeTruthy();
		});
		test('Create - return false', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await wordDB.create({ word: '' });
			const res2 = await wordDB.create({ word: 'tests' });
			expect(res).toBe(false);
			expect(res).toBeFalsy();
			expect(res2).toBe(false);
			expect(res2).toBeFalsy();
		});
	});

	describe('Read', () => {
		test('Read - return word', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, word: 'tests' }] });
			const res = await wordDB.read(1);
			expect(res).toStrictEqual({ id: 1, word: 'tests' });
		});
		test('Read - return undefined', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await wordDB.read(1);
			expect(res).toBe(undefined);
			expect(res).toBeFalsy();
		});
	});

	describe('Update', () => {
		test('Update - return word', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, word: 'tests' }] });
			const res = await wordDB.update(1, { word: 'tests' });
			expect(res).toStrictEqual({ id: 1, word: 'tests' });
		});
		test('Update - return undefined', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });

			const res = await wordDB.update(1, { word: 'tests' });
			expect(res).toBe(undefined);
			try {
				await wordDB.update(1, { word: 'test' });
			} catch (error: any) {
				expect(error.message).toBe('Word not valid');
			}
		});
	});

	describe('Delete', () => {
		test('Delete - return true', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			const res = await wordDB.delete(1);
			expect(res).toBe(true);
			expect(res).toBeTruthy();
		});
		test('Delete - return false', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, word: 'tests' }] });
			const res = await wordDB.delete(1);
			expect(res).toBe(false);
			expect(res).toBeFalsy();
		});
	});

	describe('GetRandomWord', () => {
		test('GetRandomWord - return word', async () => {
			MockClient.query = () => Promise.resolve({ rows: [{ id: 1, word: 'tests' }] });
			const res = await wordDB.getRandomWord();
			expect(res).toBe('tests');
			expect(res).toHaveLength(5);
		});
		test('getRandomWord - throw error', async () => {
			MockClient.query = () => Promise.resolve({ rows: [] });
			try {
				await wordDB.getRandomWord();
			} catch (error: any) {
				expect(error.message).toBe('Couldn`t get random word.');
			}
		});
	});
});
