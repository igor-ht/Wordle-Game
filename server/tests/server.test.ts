/* import * as ServerFunctions from '../src/routes';
import CryptoJS from 'crypto-js'; */
import {describe, expect, test, jest } from '@jest/globals';
import { decryption, encryption } from '../controllers/cryptoData';


/* const server = jest.requireActual<typeof ServerFunctions>('../src/routes');
const crypto = jest.requireActual<typeof CryptoJS>('../controllers/wordController'); */


describe("Testing get word from server",  () => {

  test('should receive word `grain`', async () => {
    const fetchData = await fetch('http://localhost:5000/word');
    const word = await fetchData.text();
    expect(word).toBe('grain');
  });
});


describe("Testing encryption and decryption", () => {

  test('Should encrypt and decrypt a word with a specific key', () => {
    const myKey = 'My Wordle-Game is the best';
    const cyphertext = encryption('word', myKey);
    const plaintext = decryption(cyphertext, myKey);
    expect(cyphertext).not.toBe('word');
    expect(plaintext).toBe('word');
  });
})
