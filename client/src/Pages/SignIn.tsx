import { RefObject, useContext, useRef } from 'react';
import WordleContext from '../Context/wordleContext';

export function SignIn() {
	const { decryption, setUser, navigate } = useContext(WordleContext);

	const formRef: RefObject<HTMLFormElement> = useRef(null);

	async function userLogIn(event: React.FormEvent<HTMLFormElement>, formRef: RefObject<HTMLFormElement>) {
		event.preventDefault();
		event.stopPropagation();

		const inputs = formRef.current?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
		const res = await fetch(`http://localhost:5000/user/find/${inputs[0].value}`);
		const userFromDb = await res.json();
		if (
			userFromDb.email === inputs[0].value &&
			decryption(userFromDb.password, '!@#PasswordEncryption$%^') === inputs[1].value
		) {
			setUser({ name: userFromDb.name, password: userFromDb.password });
			navigate('/play');
		} else {
			alert('One or more fields are invalid.');
		}
	}

	return (
		<main className="form-signin w-25 ms-5 mt-3 text-center">
			<form
				ref={formRef}
				className="w-75"
				
				onSubmit={(event) => userLogIn(event, formRef)}>
				<h1 className="h1 mb-3 fw-normal">Sign in</h1>

				<div className="form-floating mb-2">
					<input
						type="email"
						name="email"
						className="form-control fs-5"
						placeholder="name@example.com"
					/>
					<label className="text-center fs-6">Email address</label>
				</div>

				<div className="form-floating mb-3">
					<input
						type="password"
						name="password"
						className="form-control fs-5"
						placeholder="Password"
					/>
					<label className="text-center fs-6">Password</label>
				</div>

				<button
					className="w-50 btn btn-lg btn-primary"
					type="submit">
					Sign in
				</button>
			</form>
		</main>
	);
}
