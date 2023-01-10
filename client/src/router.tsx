import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Welcome } from './Pages/layout/Welcome';
import { AppWordle } from './Pages/game/AppWordle';
import { SignIn } from './Pages/forms/SignIn';
import { SignUp } from './Pages/forms/SignUp';

export const wordleRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/home',
				element: <Welcome />,
			},
			{
				path: '/sign-in',
				element: <SignIn />,
			},
			{
				path: '/sign-up',
				element: <SignUp />,
			},
			{
				path: '/play',
				element: <AppWordle />,
			},
		],
	},
]);
