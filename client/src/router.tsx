import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Welcome } from './Pages/Home/Welcome';
import { AppWordle } from './Pages/Game/AppWordle';
import { SignIn } from './Pages/Forms/SignIn';
import { SignUp } from './Pages/Forms/SignUp';

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
