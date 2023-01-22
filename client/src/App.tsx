import { HomePage } from './Pages/Home/Home';
import { Outlet } from 'react-router-dom';
import WordleContext from './Context/wordleContext';
import { WordleApi } from './Services/wordleApi';

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
