import cypress from 'cypress';

describe('template spec', async () => {
	it('passes', () => {
		cy.visit('http://localhost:3000');
	});
});
