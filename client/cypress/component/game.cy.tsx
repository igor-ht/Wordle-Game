import { mount } from 'cypress/react18';
import WordleContext from '../../src/Context/wordleContext';
import KeyboardConstructor from '../../src/Pages/Game/Keyboard';
import InputConstructor from '../../src/Pages/Game/Input';

describe('Wordle game components', () => {
	describe('Input component testing', () => {
		beforeEach(() => {
			const gameState = {
				randomWord: '',
				statePicture: [
					[
						{ inputId: 0, inputValue: '', inputStatus: '' },
						{ inputId: 1, inputValue: '', inputStatus: '' },
						{ inputId: 2, inputValue: '', inputStatus: '' },
						{ inputId: 3, inputValue: '', inputStatus: '' },
						{ inputId: 4, inputValue: '', inputStatus: '' },
						{ inputId: 5, inputValue: '', inputStatus: '' },
					],
					[
						{ inputId: 6, inputValue: '', inputStatus: '' },
						{ inputId: 7, inputValue: '', inputStatus: '' },
						{ inputId: 8, inputValue: '', inputStatus: '' },
						{ inputId: 9, inputValue: '', inputStatus: '' },
						{ inputId: 10, inputValue: '', inputStatus: '' },
						{ inputId: 11, inputValue: '', inputStatus: '' },
					],
					[
						{ inputId: 12, inputValue: '', inputStatus: '' },
						{ inputId: 13, inputValue: '', inputStatus: '' },
						{ inputId: 14, inputValue: '', inputStatus: '' },
						{ inputId: 15, inputValue: '', inputStatus: '' },
						{ inputId: 16, inputValue: '', inputStatus: '' },
						{ inputId: 17, inputValue: '', inputStatus: '' },
					],
					[
						{ inputId: 18, inputValue: '', inputStatus: '' },
						{ inputId: 19, inputValue: '', inputStatus: '' },
						{ inputId: 20, inputValue: '', inputStatus: '' },
						{ inputId: 21, inputValue: '', inputStatus: '' },
						{ inputId: 22, inputValue: '', inputStatus: '' },
						{ inputId: 23, inputValue: '', inputStatus: '' },
					],
					[
						{ inputId: 24, inputValue: '', inputStatus: '' },
						{ inputId: 25, inputValue: '', inputStatus: '' },
						{ inputId: 26, inputValue: '', inputStatus: '' },
						{ inputId: 27, inputValue: '', inputStatus: '' },
						{ inputId: 28, inputValue: '', inputStatus: '' },
						{ inputId: 29, inputValue: '', inputStatus: '' },
					],
				],
				currentIndex: 0,
				currentInputId: 0,
			};
			const inputContainerRef = { current: null };
			const handleInputChange = cy.stub();
			const backSpace = cy.stub();
			const contextValue = { gameState, inputContainerRef, handleInputChange, backSpace };
			mount(
				<WordleContext.Provider value={contextValue}>
					<InputConstructor />
				</WordleContext.Provider>
			);
		});

		it('Input component', () => {
			cy.get('input[type="text"]').should('have.length', 30);
			cy.get('input[type="text"]').should('have.attr', 'minLength', '1');
			cy.get('input[type="text"]').should('have.attr', 'maxLength', '1');
			cy.get('input[type="text"]').should('have.attr', 'required');
		});
	});

	describe('Keyboard component testing', () => {
		beforeEach(() => {
			const handleDigitalKeyboardInput = cy.stub();
			const buttonsContainerRef = { current: null };
			const contextValue = { handleDigitalKeyboardInput, buttonsContainerRef };
			mount(
				<WordleContext.Provider value={contextValue}>
					<KeyboardConstructor />
				</WordleContext.Provider>
			);
		});

		it('Keyboard component', () => {
			cy.get('button').should('have.length', 28);
			cy.get('.enter').should('have.length', 1);
			cy.get('.backSpace').should('have.length', 1);
			cy.get('.keyboard').should('exist');
			cy.get('.enter').should('have.attr', 'disabled');
			cy.get('.backSpace').click();
		});
	});
});
