import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './style/App.css';
import { RouterProvider } from 'react-router-dom';
import { wordleRouter } from './router';

export const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RouterProvider router={wordleRouter} />
	</React.StrictMode>
);
