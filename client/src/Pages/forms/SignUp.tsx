import { useContext } from 'react';
import { Link } from 'react-router-dom';
import WordleContext from '../../Context/wordleContext';

function SignUp() {
	const { handleUserRegistration, RegistrationFormRef } = useContext(WordleContext);

	return (
		<section className="vh-100 bg-image overflow-auto">
			<div className="mask d-flex align-items-center h-100 gradient-custom-3">
				<div className="container align-self-start m-5">
					<div className="row d-flex justify-content-center align-items-center">
						<div className="col-12 col-md-9 col-lg-7">
							<div className="card border-success">
								<div className="card-body">
									<h2 className="text-uppercase text-center mb-5">Create an account</h2>

									<form
										ref={(el) => {
											RegistrationFormRef.current = el;
										}}
										className="form-control-sm"
										onSubmit={(event) => {
											event.stopPropagation();
											event.preventDefault();
											handleUserRegistration(RegistrationFormRef.current);
										}}>
										<div className="row">
											<div className="form-outline mb-4 col">
												<input
													type="text"
													name="name"
													id="name"
													className="form-control form-control-lg border-success"
													required
												/>
												<label
													className="form-label"
													htmlFor="name">
													Your Name
												</label>
											</div>

											<div className="form-outline mb-4 col">
												<input
													type="email"
													name="email"
													id="email"
													className="form-control form-control-lg border-success"
													required
												/>
												<label
													className="form-label"
													htmlFor="email">
													Your Email
												</label>
											</div>
										</div>

										<div className="row">
											<div className="form-outline mb-4 col">
												<input
													type="password"
													name="password"
													id="password"
													className="form-control form-control-lg border-success"
													required
												/>
												<label
													className="form-label"
													htmlFor="password">
													Password
												</label>
											</div>

											<div className="form-outline mb-4 col">
												<input
													type="password"
													name="confirmpassword"
													id="confirmpassword"
													className="form-control form-control-lg border-success"
													required
												/>
												<label
													className="form-label"
													htmlFor="confirmpassword">
													Repeat your password
												</label>
											</div>
										</div>

										<div className="d-flex justify-content-center">
											<button
												type="submit"
												className="btn btn-success btn-block btn-lg gradient-custom-4t">
												Register
											</button>
										</div>

										<p className="text-center text-muted mt-3 mb-0">
											Have an account already?{' '}
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

export default SignUp;
