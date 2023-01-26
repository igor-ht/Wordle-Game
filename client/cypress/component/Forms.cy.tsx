import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import WordleContext from '../../src/Context/wordleContext';
import SignIn from '../../src/Pages/Forms/SignIn';
import SignUp from '../../src/Pages/Forms/SignUp';

describe('SignUp and SignIn Components', () => {
	describe('SignUp component testing', () => {
		beforeEach(() => {
			const handleUserRegistration = cy.stub();
			const RegistrationFormRef = { current: null };
			const contextValue = { handleUserRegistration, RegistrationFormRef };
			mount(
				<WordleContext.Provider value={contextValue}>
					<MemoryRouter initialEntries={['/']}>
						<SignUp />
					</MemoryRouter>
				</WordleContext.Provider>
			);
		});
		it('SignUp Component', () => {
			cy.get('input').should('have.length', 4);
			cy.get('input[type="email"]').should('have.length', 1);
			cy.get('input[type="password"]').should('have.length', 2);
			cy.get('input[type="text"]').should('have.length', 1);
			cy.get('button').should('have.length', 1);
			cy.get('u').should('have.length', 1);
			cy.get('p').should('have.length', 1);
		});
	});

	describe('SignIn component testing', () => {
		beforeEach(() => {
			const userLogIn = cy.stub();
			const LoginFormRef = { current: null };
			const contextValue = { userLogIn, LoginFormRef };
			mount(
				<WordleContext.Provider value={contextValue}>
					<MemoryRouter initialEntries={['/']}>
						<SignIn />
					</MemoryRouter>
				</WordleContext.Provider>
			);
		});
		it('SignIn component', () => {
			cy.get('input').should('have.length', 2);
			cy.get('input[type="email"]').should('have.length', 1);
			cy.get('input[type="password"]').should('have.length', 1);
			cy.get('u').should('have.length', 1);
			cy.get('p').should('have.length', 1);
			cy.get('form').should('have.length', 1);
		});
	});
});
