import { useContext } from 'react';
import WordleContext from '../../Context/wordleContext';

const InputConstructor = () => {
	const { inputBoard } = useContext(WordleContext);

	return <>{inputBoard()}</>;
};

export default InputConstructor;
