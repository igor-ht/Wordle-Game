import express from 'express';
import { getRandomWord, postNewWord, getWordByID, updateWord, deleteWord, checkWordGuess } from './wordApi';
import { serverConfig } from '../Config/serverConfig';
import { MiddlewareAuth } from '../Auth/authApi';

const wordRouter = express.Router();

export const MYKEY = serverConfig.WORD_KEY;

wordRouter.get('/randWord', getRandomWord);

wordRouter.post('/checkGuess', checkWordGuess);

wordRouter.use(MiddlewareAuth);

wordRouter.post('/newWord', postNewWord);

wordRouter.get('/:id', getWordByID);

wordRouter.put('/updateWord', updateWord);

wordRouter.delete('/deleteWord', deleteWord);

export default wordRouter;
