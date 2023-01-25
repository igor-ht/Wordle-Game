import { ChangeEvent, createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { encryption } from './cryptoData';
import { PASS_KEY, host, origin } from '../Config/serverConfig';

const PASSKEY = PASS_KEY!;

interface StateInterface {
	randomWord: String;
	statePicture: InputInterface[][];
	currentIndex: number;
	currentInputId: number;
}

export interface InputInterface {
	inputId: number;
	inputValue: string;
	inputStatus: string;
}

interface IUserData {
	name: String;
	email: String;
}

function WordleApi() {
	const navigate = useNavigate();
	const inputContainerRef = createRef<HTMLElement>();
	const buttonsContainerRef = createRef<HTMLElement>();
	const LoginFormRef = createRef<HTMLFormElement>();
	const RegistrationFormRef = createRef<HTMLFormElement>();

	const [user, setUser] = useState<IUserData>({
		name: 'Guest',
		email: '',
	});

	const [gameState, setGameState] = useState<StateInterface>({
		randomWord: '',
		statePicture: [],
		currentIndex: 0,
		currentInputId: 0,
	});

	useEffect(() => {
		if (window.location.pathname === '/') {
			navigate('/home');
		}
	}, [navigate]);

	useEffect(() => {
		fetch(`http://${host}:${origin}/word/randWord`)
			.then((res) => res.text())
			.then((word) => (gameState.randomWord = word))
			.catch((err) => console.log(err));
	});

	function createStatePicture() {
		if (gameState.statePicture.length < 1) {
			let index = 0;
			for (let i = 1; i < 7; i++) {
				let array: InputInterface[] = [];
				for (let j = 1; j < 6; j++) {
					let new_object: InputInterface = {
						inputId: index,
						inputValue: '',
						inputStatus: '',
					};
					array.push(new_object);
					index += 1;
				}
				gameState.statePicture.push(array);
			}
		}
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const data = event.target.value;
		if (!/^[a-zA-Z]$/.test(data)) return (event.target.value = '');

		event.target.value = data.toUpperCase();

		updateGameState(+event.currentTarget.id, event.target.value);
		handleInputChangeFocus(event.target);
	}

	function handleDigitalKeyboardInput(event: React.MouseEvent<HTMLButtonElement>) {
		if (event.currentTarget.id === 'Enter') return;
		if (event.currentTarget.id === 'BckSpc') return backSpace();

		const inputArray = inputContainerRef.current!.childNodes as NodeListOf<HTMLInputElement>;
		let currentInput: HTMLInputElement;
		inputArray.forEach((input: HTMLInputElement) => {
			if (+input.id === gameState.currentInputId) {
				input.value = event.currentTarget.id;
				currentInput = input;
			}
		});
		updateGameState(+currentInput!.id, event.currentTarget.id);
		handleInputChangeFocus(currentInput!);
	}

	function handleInputChangeFocus(element: HTMLInputElement) {
		if (+element.id === 29) return (element.disabled = true);

		const nextSibling = element.nextSibling as HTMLInputElement;
		element.disabled = true;
		nextSibling.disabled = false;
		nextSibling.focus();
	}

	function updateGameState(id: number, newChar: string) {
		gameState.statePicture[gameState.currentIndex].forEach(async (input: InputInterface) => {
			if (+input.inputId === +id) {
				input.inputValue = newChar;
				gameState.currentInputId += 1;
				if (input === gameState.statePicture[gameState.currentIndex][4]) {
					const inputRow = await checkWordGuess(gameState.statePicture[gameState.currentIndex]);
					handleUserGuess(inputRow);
					gameState.currentIndex += 1;
				}
			}
		});
	}

	async function checkWordGuess(inputRow: InputInterface[]) {
		const res = await fetch('http://localhost:5000/word/checkGuess', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ word: gameState.randomWord, row: inputRow }),
		});
		const ans: string[] = await res.json();

		ans.forEach((check: string, index: number) => {
			if (check === 'bull') {
				inputRow[index].inputStatus = 'bull';
			} else if (check === 'cow') {
				inputRow[index].inputStatus = 'cow';
			} else {
				inputRow[index].inputStatus = 'wrong';
			}
		});

		return inputRow;
	}

	function handleUserGuess(inputRow: InputInterface[]) {
		if (inputRow.every((el) => el.inputStatus === 'bull')) {
			setTimeout(() => {
				alert(`Victory, ${user.name}! You got the right word!`);
				return restartGame();
			}, 1000);
		}
		if (inputRow === gameState.statePicture[5]) {
			setTimeout(() => {
				alert(`Wrong word, ${user.name}. Try again!`);
				return restartGame();
			}, 1000);
		}
		updateInputStatus(inputRow);
		updateButtonStatus(inputRow);
	}

	function updateInputStatus(inputRow: InputInterface[]) {
		const inputArray = Array.from(inputContainerRef.current!.children as HTMLCollectionOf<HTMLInputElement>);
		const subArray = [];
		for (let i = 0; i < inputArray.length; i += 5) {
			subArray.push(inputArray.slice(i, i + 5));
		}
		subArray[gameState.currentIndex].forEach((input: HTMLInputElement, index: number) => {
			if (inputRow[index].inputStatus === 'bull') {
				input.classList.add('text-bg-success');
			} else if (inputRow[index].inputStatus === 'cow') {
				input.classList.add('text-bg-warning');
			} else {
				input.classList.add('text-bg-light');
			}
		});
	}

	function updateButtonStatus(inputRow: InputInterface[]) {
		const insertedLetters = inputRow.map((input) => {
			return { inputValue: input.inputValue, inputStatus: input.inputStatus };
		});
		const buttonsArray = Array.from(buttonsContainerRef.current!.children as HTMLCollectionOf<HTMLButtonElement>);
		insertedLetters.forEach((el) => {
			buttonsArray.forEach((button: HTMLButtonElement) => {
				if (button.id === el.inputValue) {
					button.classList.add('btn', 'active');
					if (el.inputStatus === 'bull') {
						if (button.classList.contains('btn-warning')) {
							button.classList.remove('btn-warning');
						}
						button.classList.add('btn-success');
					} else if (el.inputStatus === 'cow') {
						if (!button.classList.contains('btn-success')) {
							button.classList.add('btn-warning');
						}
					}
				}
			});
		});
	}

	function backSpace() {
		if (gameState.currentInputId === 0) return;
		if (gameState.statePicture[gameState.currentIndex][0].inputId === gameState.currentInputId) return;
		const inputContainer = Array.from(inputContainerRef.current!.children) as HTMLInputElement[];
		for (let el of inputContainer) {
			if (+el.id === gameState.currentInputId - 1) {
				const nextSibling = el.nextSibling as HTMLInputElement;
				el.value = '';
				el.disabled = false;
				el.focus();
				nextSibling.disabled = true;
				gameState.currentInputId -= 1;

				gameState.statePicture[gameState.currentIndex].forEach((element) => {
					if (element.inputId === +el.id) {
						element.inputValue = '';
					}
				});
				break;
			}
		}
	}

	function restartGame() {
		let keyboard = Array.from(buttonsContainerRef.current!.children) as HTMLButtonElement[];
		keyboard.forEach((button: HTMLButtonElement) => {
			if (button.id !== 'Enter' && button.id !== 'BckSpc') button.className = '';
		});

		let allInput = Array.from(inputContainerRef.current!.children) as HTMLInputElement[];
		allInput.forEach((input: HTMLInputElement) => {
			input.classList.remove('text-bg-success', 'text-bg-warning', 'text-bg-light');
		});

		gameState.currentIndex = 0;
		gameState.currentInputId = 0;
		navigate('/play');
	}

	async function handleUserRegistration(formRef: HTMLFormElement) {
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
					email: inputs[2].value,
				});
				navigate('/home');
			} else {
				throw new Error(data);
			}
		} catch (error) {
			alert(error);
		}
	}

	async function userLogIn(formRef: HTMLFormElement) {
		const inputs = formRef.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
		try {
			const res = await fetch(`http://${host}:${origin}/user/login`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: inputs[0].value, password: inputs[1].value }),
			});

			const { token, name, email } = await res.json();
			localStorage.setItem('jwt', token);
			setUser({ name: name, email: email });
			navigate('/play');
		} catch (error) {
			alert('Email or password not valid.');
		}
	}

	return {
		gameState,
		setGameState,
		createStatePicture,
		user,
		setUser,
		handleUserRegistration,
		RegistrationFormRef,
		userLogIn,
		LoginFormRef,
		inputContainerRef,
		buttonsContainerRef,
		handleInputChange,
		handleDigitalKeyboardInput,
		backSpace,
	};
}

export default WordleApi;
