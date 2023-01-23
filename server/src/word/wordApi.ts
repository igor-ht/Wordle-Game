import { Request, Response } from 'express';
import { encryption } from '../../Controllers/cryptoData';
import { WordDao } from '../../Controllers/wordController';
import checkDbConnection from '../../Models/db.client';
import { MYKEY } from './wordRouter';

let WordService: WordDao;
function WordDB() {
	if (!WordService) {
		WordService = new WordDao(checkDbConnection());
	}
	return WordService;
}

export async function getRandomWord(req: Request, res: Response) {
	const randomWord = await WordDB().getRandomWord();
	const cyphertext = encryption(randomWord, MYKEY);
	res.status(200).send(cyphertext);
}

export async function postNewWord(req: Request, res: Response) {
	const { word } = req.body;
	const createWord = await WordDB().create({ word: word });
	if (createWord) {
		res.status(200).send('The new word was succesfully added to the database');
	} else {
		res.status(404).send('New word not valid.');
	}
}

export async function getUserByID(req: Request, res: Response) {
	const wordId = +req.params.id;
	const result = await WordDB().read(wordId);
	res.status(200).send(result);
}

export async function updateWord(req: Request, res: Response) {
	const { id, word } = req.body;
	const updated = await WordDB().update(id, { word: word });
	res.status(200).send(updated);
}

export async function deleteWord(req: Request, res: Response) {
	const { id } = req.body;
	const removed = await WordDB().delete(+id);
	res.status(200).send(removed);
}
