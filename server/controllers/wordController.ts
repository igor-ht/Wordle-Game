import { encryption, decryption } from './cryptoData';


export async function fetchRandomWord() {
  const myKey = '$%^Encrypt!@#';
  try {
    const response = await fetch('http://localhost:5000/word');
    const word = await response.text();
    return word
  } catch (error) {
    throw error;
  }
};


