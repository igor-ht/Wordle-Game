import cypress, { mount } from 'cypress/react18';
import React from 'react';
import Keyboard from '../../src/Pages/Game/Keyboard';
import WordleContext from '../../src/Context/wordleContext';
import WordleApi from '../../src/Services/wordleApi';

describe('Component testing', () => {
	it('keyboard', () => {
		cy.stub(React, 'useContext').callsFake((context) => {
			if (context === WordleContext) return WordleApi;
			return React.useContext(context);
		});
		mount(<Keyboard />);
		cy.get('button').should('have.length', 28);
		cy.get('.keyboard button.enter').should('be.disabled');
		cy.get('.keyboard button.backSpace').should('not.be.disabled');
	});
});
