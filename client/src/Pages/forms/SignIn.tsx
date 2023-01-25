import { useContext } from 'react';
import { Link } from 'react-router-dom';
import WordleContext from '../../Context/wordleContext';

function SignIn() {
	const { userLogIn, LoginFormRef } = useContext(WordleContext);

	return (
		<section className="vh-100 bg-image overflow-auto">
			<div className="mask d-flex align-items-center h-100 gradient-custom-3">
				<div className="container align-self-start m-5">
					<div className="row d-flex justify-content-center align-items-center">
						<div className="col-12 col-md-9 col-lg-7">
							<div className="card border-primary">
								<div className="card-body">
									<h2 className="text-uppercase text-center text- mb-5">Login into account</h2>

									<form
										ref={LoginFormRef}
										className="form-control-sm"
										onSubmit={(event) => {
											event.stopPropagation();
											event.preventDefault();
											userLogIn(LoginFormRef.current);
										}}>
										<div className="row">
											<div className="form-outline mb-4 col">
												<input
													type="text"
													name="email"
													id="form3Example1cg"
													className="form-control form-control-lg border-primary"
													title="email"
													required
												/>
												<label
													className="form-label fs-6"
													htmlFor="form3Example1cg">
													Your Email
												</label>
											</div>
										</div>

										<div className="row">
											<div className="form-outline mb-4 col">
												<input
													type="password"
													name="password"
													id="form3Example4cg"
													className="form-control form-control-lg border-primary"
													title="password"
													required
												/>
												<label
													className="form-label fs-6"
													htmlFor="form3Example4cg">
													Password
												</label>
											</div>
										</div>

										<div className="d-flex justify-content-center">
											<button
												type="submit"
												className="btn btn-primary btn-block btn-lg gradient-custom-4">
												Sign In
											</button>
										</div>

										<p className="text-center text-muted mt-3 mb-0">
											Don't have an account?{' '}
											<u>
												<Link to={'/sign-up'}>Register Here</Link>
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

export default SignIn;
