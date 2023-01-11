import { useContext } from 'react';
import { Link } from 'react-router-dom';
import WordleContext from '../../Context/wordleContext';

export function HomePage() {
	const { createStatePicture, user, setUser } = useContext(WordleContext);

	createStatePicture();

	return (
		<nav
			className="navbar navbar-expand-lg bg-light"
			style={{ height: '60px' }}>
			<div className="container-fluid">
				<span className="navbar-brand fs-1">Wordle</span>
				<p className="nav fs-4 m-2 text-decoration-underline">Welcome, {user.name}!</p>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<Link
							className="nav-link fs-4"
							aria-current="page"
							to={'/home'}>
							Home
						</Link>
						<Link
							className="nav-link fs-4"
							to={'/sign-in'}>
							Sign In
						</Link>
						<Link
							className="nav-link fs-4"
							to={'/play'}>
							Play
						</Link>
					</div>
				</div>
				{user.name !== 'Guest' && (
					<button
						type="button"
						className="btn btn-outline-secondary btn-sm"
						onClick={() => {
							let new_user = { name: 'Guest', password: '' };
							setUser(new_user);
						}}>
						Sign out
					</button>
				)}
			</div>
		</nav>
	);
}
