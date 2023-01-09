import express from 'express';
import { encryption } from '../controllers/cryptoData';
import { WordDao } from '../controllers/wordController';
import { client, connectDataBase } from '../models/db.client';

const wordRouter = express.Router();

connectDataBase();

const WordDB = new WordDao(client);

const MYKEY = '!@#EncryptionWord$%^';

wordRouter.get('/', (req, res) => {
	res.send('connected');
	res.status(200);
});

wordRouter.get('/randWord', async (req, res) => {
	const randomWord = await WordDB.getRandomWord();
	const cyphertext = encryption(randomWord, MYKEY);
	res.status(200);
	res.send(cyphertext);
});

wordRouter.post('/newWord', async (req, res) => {
	const { word } = req.body;
	const createWord = await WordDB.create({ word: word });
	if (createWord) {
		res.send('The new word was succesfully added to the database');
		res.status(200);
	} else {
		res.send('New word not valid.');
		res.status(404);
	}
});

wordRouter.get('/:id', async (req, res) => {
	const wordId = +req.params.id;
	const result = await WordDB.read(wordId);
	res.send(result);
	res.status(200);
});

wordRouter.put('updateWord', async (req, res) => {
	const { id, word } = req.body;
	const updated = await WordDB.update(id, { word: word });
	res.send(updated);
	res.status(200);
});

wordRouter.delete('deleteWord', async (req, res) => {
	const { id } = req.body;
	const removed = await WordDB.delete(+id);
	res.send(removed);
	res.status(200);
});

export default wordRouter;
