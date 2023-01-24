import { Fragment, useContext } from 'react';
import WordleContext from '../../Context/wordleContext';
import { InputInterface } from '../../Services/wordleApi';

const InputConstructor = () => {
	const { handleInputLetter, gameState } = useContext(WordleContext);

	return (
		<div
			className="myContainer"
			key={Math.random().toString()}>
			{gameState.statePicture.map((row: InputInterface[], i: Number) => (
				<Fragment key={Math.random().toString()}>
					{row.map((input: InputInterface, j: Number) =>
						i === 0 && j === 0 ? (
							<input
								type={'text'}
								key={input.inputId.toString()}
								id={input.inputId.toString()}
								onKeyDown={handleInputLetter}
								minLength={1}
								maxLength={1}
								required
								autoFocus
							/>
						) : (
							<input
								type={'text'}
								key={input.inputId.toString()}
								id={input.inputId.toString()}
								onKeyDown={handleInputLetter}
								minLength={1}
								maxLength={1}
								required
								disabled
							/>
						)
					)}
				</Fragment>
			))}
		</div>
	);
};

export default InputConstructor;
