import { Link } from 'react-router-dom';

function Welcome() {
	return (
		<div
			className="row m-5"
			style={{ height: '100%', width: '100%' }}>
			<div
				className="col-sm-6 m-1"
				style={{ height: '50%', width: '45%' }}>
				<div className="card border-warning">
					<div className="card-header fs-2 border-warning">Game Rules &#129513;</div>
					<ul className="list-group list-group-flush m-1">
						<li className="list-group-item fs-4 border-warning">Guess a random five-letters word. ❓</li>
						<li className="list-group-item fs-4 border-warning">You have six chances. 🎯</li>
						<li className="list-group-item fs-4 border-warning">
							&#9989; - Right letter at right place.
							<br />
							&#129000; - Right letter at wrong place.
						</li>
					</ul>
				</div>
			</div>

			<div
				className="col-sm-6"
				style={{ height: '50%', width: '45%' }}>
				<div className="card border-success">
					<div className="card-header fs-2 border-success">Sign Up &#128077;</div>
					<div className="card-body">
						<h5 className="card-title fs-4">Create a free account and enjoy more!</h5>
						<p className="card-text fs-5">
							Play with other players, challenge your friends and be the King of Word Guessing.
						</p>
						<br />
						<Link
							to={'/sign-up'}
							className="btn btn-success">
							Sign up now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Welcome;
