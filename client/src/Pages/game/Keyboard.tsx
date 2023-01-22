import { useContext } from 'react';
import WordleContext from '../../Context/wordleContext';

const KeyboardConstructor = () => {
	const { createKeyboard } = useContext(WordleContext);

	return <div className="keyboard">{createKeyboard()}</div>;
};

export default KeyboardConstructor;
