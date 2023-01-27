import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import WordleContext from '../../src/Context/wordleContext';
import HomePage from '../../src/Pages/Home/Home';
import Welcome from '../../src/Pages/Home/Welcome';

describe('HomePage and Welcome components', () => {
	describe('HomePage component testing', () => {
		beforeEach(() => {
			const user = { name: 'Test', email: '' };
			const setUser = cy.stub();
			const contextValue = { user, setUser };
			mount(
				<WordleContext.Provider value={contextValue}>
					<MemoryRouter initialEntries={['/']}>
						<HomePage />
					</MemoryRouter>
				</WordleContext.Provider>
			);
		});
	});
	it('HomePage Component', () => {});

	describe('Welcome component testing', () => {
		beforeEach(() => {
			mount(
				<MemoryRouter initialEntries={['/']}>
					<Welcome />
				</MemoryRouter>
			);
		});
		it('Welcome Component', () => {
			cy.get('ul').should('have.length', 1);
			cy.get('li').should('have.length', 3);
		});
	});
});
