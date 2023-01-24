//import cypress from 'cypress';
import cypress, { mount } from 'cypress/react18'
import Input from '../../src/Pages/Game/Input';

describe('template spec', async () => {
	it('passes', () => {
		cy.visit('http://localhost:3000');
	});
});

describe('Components testing', () => {
	it('Testing Input Component', () => {
		mount(<Input />)
	})
})