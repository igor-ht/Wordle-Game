import { useContext } from 'react';
import WordleContext from '../../Context/wordleContext';

const KeyboardConstructor = () => {
	const { handleDigitalKeyboardInput, buttonsContainerRef } = useContext(WordleContext);

	const keyboardArray = [
		'Q',
		'W',
		'E',
		'R',
		'T',
		'Y',
		'U',
		'I',
		'O',
		'P',
		'Enter',
		'A',
		'S',
		'D',
		'F',
		'G',
		'H',
		'J',
		'K',
		'L',
		'Z',
		'X',
		'C',
		'V',
		'B',
		'N',
		'M',
		'BckSpc',
	];

	return (
		<div ref={buttonsContainerRef} className="keyboard">
			{keyboardArray.map((char) => {
				if (char === 'Enter') {
					return (
						<button
							type="button"
							className="enter"
							key={char}
							id={char}
							onClick={handleDigitalKeyboardInput}
							disabled>
							<p>{char}</p>
						</button>
					);
				} else if (char === 'BckSpc') {
					return (
						<button
							type="button"
							className="backSpace"
							key={char}
							id={char}
							onClick={handleDigitalKeyboardInput}>
							<p>{char}</p>
						</button>
					);
				} else {
					return (
						<button
							type="button"
							key={char}
							id={char}
							onClick={handleDigitalKeyboardInput}
							style={{ maxWidth: '100%' }}>
							<p>{char}</p>
						</button>
					);
				}
			})}
		</div>
	);
};

export default KeyboardConstructor;
