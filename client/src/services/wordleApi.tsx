import { Fragment, KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { encryption, decryption } from './cryptoData';
import {PASS_KEY, WORD_KEY, host, origin} from '../Config/serverConfig';

const PASSKEY = PASS_KEY!;
const WORDKEY = WORD_KEY!;

 interface InputInterface {
	inputId: number;
	inputValue: string;
	inputStatus: string;
}

 interface StateInterface {
	randomWord: String;
	insertedLetters: String[];
	statePicture: InputInterface[][];
}

 interface UserData {
	name: String;
	password: String;
}

function WordleApi() {
	const navigate = useNavigate();

	const [user, setUser] = useState<UserData>({
		name: 'Guest',
		password: '',
	});

	const [gameState, setGameState] = useState<StateInterface>({
		randomWord: '',
		insertedLetters: [],
		statePicture: [],
	});

	useEffect(() => {
		if (window.location.pathname === '/') {
			navigate('/home');
		}
	}, [navigate]);

	useEffect(() => {
		fetch(`http://${host}:${origin}/word/randWord`)
			.then((res) => res.text())
			.then((word) => (gameState.randomWord = decryption(word, WORDKEY).toUpperCase()))
			.catch((err) => console.log(err));
	});

	const createStatePicture = () => {
		if (gameState.statePicture.length < 1) {
			for (let i = 1; i < 7; i++) {
				let array: InputInterface[] = [];
				for (let j = 1; j < 6; j++) {
					let new_object: InputInterface = {
						inputId: Math.random() * Date.now(),
						inputValue: '',
						inputStatus: 'empty',
					};
					array.push(new_object);
				}
				gameState.statePicture.push(array);
			}
		}
	};

	const inputBoard = () => {
		return (
			<div
				className="myContainer"
				key={Math.random().toString()}>
				{gameState.statePicture.map((row: InputInterface[], index: Number) => createInputRow(row, index))}
			</div>
		);
	};

	function createInputRow(row: InputInterface[], i: Number) {
		return (
			<Fragment key={Math.random().toString()}>
				{row.map((input: InputInterface, j: Number) =>
					i === 0 && j === 0 ? (
						<input
							type={'text'}
							key={input.inputId.toString()}
							id={input.inputId.toString()}
							onKeyDown={handleInputLetter}
							minLength={1}
							maxLength={1}
							required
							autoFocus
						/>
					) : (
						<input
							type={'text'}
							key={input.inputId.toString()}
							id={input.inputId.toString()}
							onKeyDown={handleInputLetter}
							minLength={1}
							maxLength={1}
							required
							disabled
						/>
					)
				)}
			</Fragment>
		);
	}

	function createKeyboard() {
		let keyboardArray = [
			'Q',
			'W',
			'E',
			'R',
			'T',
			'Y',
			'U',
			'I',
			'O',
			'P',
			'Enter',
			'A',
			'S',
			'D',
			'F',
			'G',
			'H',
			'J',
			'K',
			'L',
			'Z',
			'X',
			'C',
			'V',
			'B',
			'N',
			'M',
			'BckSpc',
		];
		return keyboardArray.map((char) => {
			if (char === 'Enter') {
				return (
					<button
						type="button"
						className="enter"
						key={char}
						id={char}
						onClick={keyboardInput}
						disabled>
						<p>{char}</p>
					</button>
				);
			} else if (char === 'BckSpc') {
				return (
					<button
						type="button"
						className="backSpace"
						key={char}
						id={char}
						onClick={keyboardInput}>
						<p>{char}</p>
					</button>
				);
			} else {
				return (
					<button
						type="button"
						key={char}
						id={char}
						onClick={keyboardInput}
						style={{ maxWidth: '100%' }}>
						<p>{char}</p>
					</button>
				);
			}
		});
	}

	const restartKeyboard = (element: HTMLInputElement) => {
		let keyboard = element.parentNode?.nextSibling as HTMLElement;
		const allChar = keyboard.querySelectorAll('button');
		allChar.forEach((button) => {
			button.classList.remove('btn-warning', 'btn-success', 'active');
		});
	};

	// update the keyboard buttons color by bull, cow, wrong
	const handleInputInKeyboard = (target: HTMLInputElement, row: InputInterface[]) => {
		const keyboard = target.parentNode?.nextSibling as HTMLElement;
		const allChar = keyboard.querySelectorAll('button');
		row.forEach((input) => {
			allChar.forEach((button) => {
				if (button.id === input.inputValue) {
					button.classList.add('btn', 'active');
					if (input.inputStatus === 'bull') {
						if (button.classList.contains('btn-warning')) {
							button.classList.remove('btn-warning');
						}
						button.classList.add('btn-success');
					} else if (input.inputStatus === 'cow') {
						if (!button.classList.contains('btn-success')) {
							button.classList.add('btn-warning');
						}
					}
				}
			});
		});
		let victory = row.every((input) => input['inputValue'] === 'bull');
		if (row === gameState.statePicture[5] || victory) {
			setTimeout(() => {
				allChar.forEach((button) => {
					button.classList.remove('btn-warning', 'btn-success', 'active');
				});
			}, 1000);
		}
	};

	function updateGameStateInputValues(currentTarget: HTMLInputElement) {
		gameState.statePicture.forEach((inputRow: InputInterface[]) => {
			inputRow.forEach((inputItem: InputInterface, index: number) => {
				if (inputItem.inputId.toString() === currentTarget.id) {
					inputItem.inputValue = currentTarget.value;
					inputItem.inputStatus = 'wrong';
					gameState.insertedLetters.push(currentTarget.value);
					if (gameState.randomWord.includes(inputItem.inputValue)) {
						if (inputRow[index].inputValue === gameState.randomWord[index]) {
							inputItem.inputStatus = 'bull';
						} else {
							inputItem.inputStatus = 'cow';
						}
					}
					if (index === inputRow.length - 1) {
						handleUserInputWord(inputRow, currentTarget);
					}
					if (inputRow.indexOf(inputItem) === 4) {
						handleInputInKeyboard(currentTarget, inputRow);
					}
				}
			});
		});
	}

	function handleInputElement(currentTarget: HTMLInputElement) {
		let targetSibling = currentTarget.nextElementSibling as HTMLInputElement;
		if (currentTarget.nextElementSibling !== null) {
			targetSibling.removeAttribute('disabled');
			targetSibling.focus();
		} else {
			for (let el of gameState.statePicture[5]) {
				if (el.inputStatus !== 'bull') {
					setTimeout(() => {
						alert('You fail! The word is: ' + gameState.randomWord);
						restartKeyboard(currentTarget);
						navigate('/play');
					}, 1000);
					return;
				}
			}
		}
	}

	const handleInputLetter = (event: KeyboardEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (!/^[a-zA-Z]$/.test(event.key)) return;

		event.currentTarget.value = event.key.toUpperCase();

		updateGameStateInputValues(event.currentTarget);
		handleInputElement(event.currentTarget);
	};

	function handleUserInputWord(inputRow: InputInterface[], element: HTMLInputElement) {
		let currentElement = element as HTMLInputElement;
		let BullLetters = 0;
		for (let i = 4; i > -1; i--) {
			if (inputRow[i].inputStatus === 'bull') {
				BullLetters += 1;
				currentElement.classList.add('text-bg-success');
			} else if (inputRow[i].inputStatus === 'cow') {
				currentElement.classList.add('text-bg-warning');
			} else {
				currentElement.classList.add('text-bg-light');
			}
			currentElement = currentElement.previousElementSibling as HTMLInputElement;
		}
		if (BullLetters === 5) {
			setTimeout(() => {
				alert('Success! You got the right word: ' + gameState.randomWord);
				restartKeyboard(element);
				navigate('/play');
			}, 500);
		} else {
		}
	}

	function backSpace(event: React.MouseEvent<HTMLButtonElement>) {
		let inputContainer = event.currentTarget.parentElement?.previousElementSibling as HTMLElement;
		let currentInput = inputContainer.firstElementChild as HTMLInputElement;
		let indexRow = 0;
		let indexInput = 0;
		let counter = 0;
		while (currentInput.value !== '' && currentInput.nextElementSibling !== null) {
			counter += 1;
			indexInput += 1;
			currentInput = currentInput.nextElementSibling as HTMLInputElement;
			if (indexInput === 5) {
				indexRow += 1;
				indexInput = 0;
			}
		}

		if (counter % 5 !== 0 && counter !== 0) {
			currentInput.setAttribute('disabled', 'true');
			currentInput = currentInput.previousElementSibling as HTMLInputElement;
			currentInput.value = '';
			currentInput.focus();
			gameState.statePicture[indexRow][indexInput].inputValue = '';
			gameState.statePicture[indexRow][indexInput].inputStatus = 'empty';
		} else {
			currentInput.focus();
		}
	}

	function keyboardInput(event: React.MouseEvent<HTMLButtonElement>) {
		if (event.currentTarget.id === 'Enter') {
			return;
		} else if (event.currentTarget.id === 'BckSpc') {
			backSpace(event);
			return;
		}

		let inputContainer = event.currentTarget.parentElement?.previousElementSibling as HTMLElement;
		let currentInput = inputContainer.firstElementChild as HTMLInputElement;

		while (currentInput.value !== '' && currentInput.nextElementSibling !== null) {
			currentInput = currentInput.nextElementSibling as HTMLInputElement;
		}
		if (currentInput.value === '') {
			currentInput.value = event.currentTarget.id;
			handleInputElement(currentInput);
		}
		updateGameStateInputValues(currentInput);
	}

	const handleUserRegistration = async (formRef: HTMLFormElement) => {
		try {
			const inputs = formRef.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
			if (!inputs[0].value || !inputs[1].value || !inputs[2].value || !inputs[3].value)
				alert('User Registration not valid');
			const newUser = {
				name: inputs[0].value,
				email: inputs[1].value,
				password: inputs[2].value,
				confirmpassword: inputs[3].value,
			};

			if (inputs[2].value !== inputs[3].value) throw new Error('Your password confirmation is not valid.');

			newUser.password = encryption(newUser.password, PASSKEY);
			newUser.confirmpassword = encryption(newUser.password, PASSKEY);

			const res = await fetch(`http://${host}:${origin}/user/create`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			});

			const data = await res.text();

			if (data === 'User succesfully registered.') {
				setUser({
					name: inputs[0].value,
					password: encryption(inputs[2].value, inputs[3].value),
				});
				navigate('/home');
			} else {
				throw new Error(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const userLogIn = async (formRef: HTMLFormElement) => {
		const inputs = formRef.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
		const res = await fetch(`http://${host}:${origin}/user/find/${inputs[0].value}`);
		const userFromDb = await res.json();
		if (userFromDb.email === inputs[0].value && decryption(userFromDb.password, PASSKEY) === inputs[1].value) {
			setUser({ name: userFromDb.name, password: userFromDb.password });
			navigate('/play');
		} else {
			alert('One or more fields are invalid.');
		}
	};

	return {
		gameState,
		setGameState,
		inputBoard,
		createStatePicture,
		createInputRow,
		createKeyboard,
		user,
		setUser,
		navigate,
		encryption,
		decryption,
		handleUserRegistration,
		userLogIn,
	};
}

export default WordleApi;
