import express from 'express';
import { getRandomWord, postNewWord, getUserByID, updateWord, deleteWord } from './wordApi';

const wordRouter = express.Router();

export const MYKEY = process.env.APP_MYKEY_WORD!;

wordRouter.get('/', (req, res) => {
	res.send('connected');
	res.status(200);
});

wordRouter.get('/randWord', getRandomWord);

wordRouter.post('/newWord', postNewWord);

wordRouter.get('/:id', getUserByID);

wordRouter.put('/updateWord', updateWord);

wordRouter.delete('/deleteWord', deleteWord);

export default wordRouter;