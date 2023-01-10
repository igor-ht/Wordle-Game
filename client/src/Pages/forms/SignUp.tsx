import { RefObject, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import WordleContext from '../../Context/wordleContext';

export function SignUp(this: any) {
	const { setUser, navigate, encryption } = useContext(WordleContext);

	const formRef: RefObject<HTMLFormElement> = useRef(null);

	const handleUserRegistration = async (
		event: React.FormEvent<HTMLFormElement>,
		formRef: RefObject<HTMLFormElement>
	) => {
		event.stopPropagation();
		event.preventDefault();

		const inputs = formRef.current?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
		if (!inputs[0].value || !inputs[1].value || !inputs[2].value || !inputs[3].value)
			alert('User Registration not valid');
		const newUser = {
			name: inputs[0].value,
			email: inputs[1].value,
			password: inputs[2].value,
			confirmpassword: inputs[3].value,
		};
		if (inputs[2].value === inputs[3].value) {
			newUser.password = encryption(newUser.password, '!@#PasswordEncryption$%^');
			newUser.confirmpassword = encryption(newUser.password, '!@#PasswordEncryption$%^');

			const res = await fetch('http://localhost:5000/user/create', {
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
				alert('email already in use.');
			}
		} else {
			alert('Your password confirmation is not valid.');
		}
	};

	return (
		<section className="vh-100 bg-image overflow-auto">
			<div className="mask d-flex align-items-center h-100 gradient-custom-3">
				<div className="container h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-9 col-lg-7 col-xl-6">
							<div className="card">
								<div className="card-body p-5 mb-4 h-75">
									<h2 className="text-uppercase text-center mb-5">Create an account</h2>

									<form
										ref={formRef}
										className="form-control-sm"
										onSubmit={(event) => handleUserRegistration(event, formRef)}>
										<div className="form-outline mb-4">
											<input
												type="text"
												name="name"
												id="form3Example1cg"
												className="form-control form-control-lg"
												required
											/>
											<label
												className="form-label"
												htmlFor="form3Example1cg">
												Your Name
											</label>
										</div>

										<div className="form-outline mb-4">
											<input
												type="email"
												name="email"
												id="form3Example3cg"
												className="form-control form-control-lg"
												required
											/>
											<label
												className="form-label"
												htmlFor="form3Example3cg">
												Your Email
											</label>
										</div>

										<div className="form-outline mb-4">
											<input
												type="password"
												name="password"
												id="form3Example4cg"
												className="form-control form-control-lg"
												required
											/>
											<label
												className="form-label"
												htmlFor="form3Example4cg">
												Password
											</label>
										</div>

										<div className="form-outline mb-4">
											<input
												type="password"
												name="confirmpassword"
												id="form3Example4cdg"
												className="form-control form-control-lg"
												required
											/>
											<label
												className="form-label"
												htmlFor="form3Example4cdg">
												Repeat your password
											</label>
										</div>

										<div className="d-flex justify-content-center">
											<button
												type="submit"
												className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
												Register
											</button>
										</div>

										<p className="text-center text-muted mt-5 mb-0">
											Have already an account?{' '}
											<u>
												<Link to={'/sign-in'}>Login Here</Link>
											</u>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
