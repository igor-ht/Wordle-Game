import { Pool } from 'pg';
import { ICrudDao } from './ICrud';

interface Word {
	id: number;
	word: string;
	last_used: string;
}

interface NewWord {
	word: string;
}

export class WordDao implements ICrudDao<Word, NewWord> {
	constructor(public db: Pool) {
		this.db = db;
	}

	public async create(newWord: NewWord): Promise<boolean> {
		if (newWord.word.length !== 5) return false;
		const res = await this.db.query('INSERT INTO words (word) VALUES ($1)', [newWord.word]);
		return res.rows[0] ? true : false;
	}

	public async read(id: number): Promise<Word> {
		const res = await this.db.query('SELECT * FROM words WHERE id = $1', [id]);
		if (res.rowCount === 0) throw new Error('Word not found.');
		const data = await res.rows[0];
		return data;
	}

	public async update(id: number, newWord: NewWord): Promise<Word> {
		if (newWord.word.length !== 5) throw new Error('Word not valid');
		const res = await this.db.query('UPDATE words SET words = $1 WHERE id = $2', [newWord.word, id]);
		const data = await res.rows[0];
		return data;
	}

	public async delete(id: number): Promise<boolean> {
		const res = await this.db.query('DELETE FROM words WHERE id = $1', [id]);
		return res.rows[0] ? false : true;
	}

	public async getRandomWord() {
		const res = await this.db.query('SELECT word FROM words ORDER BY RANDOM() LIMIT 1');
		if (!(await res.rows[0])) throw new Error('Couldn`t get random word.');
		const data: string = await res.rows[0].word;
		return data;
	}
}
