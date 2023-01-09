import { RefObject, useContext, useRef } from 'react';
import WordleContext from '../Context/wordleContext';

export function SignIn() {
	const { userLogIn } = useContext(WordleContext);

	const formRef: RefObject<HTMLFormElement> = useRef(null);

	return (
		<main className="form-signin w-25 ms-5 mt-3 text-center">
			<form
				ref={formRef}
				className="w-75"
				onSubmit={userLogIn(formRef)}>
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
