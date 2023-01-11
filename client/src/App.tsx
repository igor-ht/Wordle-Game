import { HomePage } from './Pages/layout/Home';
import { Outlet } from 'react-router-dom';
import WordleContext from './Context/wordleContext';
import { WordleApi } from './services/wordleApi';

function App() {
	return (
		<>
			<WordleContext.Provider value={WordleApi()}>
				<HomePage />
				<Outlet />
			</WordleContext.Provider>
		</>
	);
}

export default App;
