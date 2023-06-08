describe('HomeView', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('renders the header correctly', () => {
		cy.contains('h1', 'Fat Snake 2');
		cy.get('.header').should('exist');
		cy.get('.logo img').should('have.attr', 'src');
		cy.get('.title').should('contain', 'Fat Snake 2');
	});

	it('renders the select and input range correctly', () => {
		cy.get('.control__select label').should('contain', 'Select size');
		cy.get('.control__select-select').should('have.length', 1);
		cy.get('#range').should('have.length', 1);
		cy.get('.btn').should('have.length', 1).should('contain', 'Start');
	});

	it('selects an option and changes the speed', () => {
		cy.get('.control__select-select').click();
		cy.get('.custom-select .options li').should('have.length', 2);
		cy.get('.custom-select .options').contains('20 cells').click();
		cy.get('.control__select-select').should('contain', '20 cells');
	});

	it('changes the speed', () => {
		cy.get('#range').invoke('val', 4).trigger('input');
		cy.get('#range').should('have.value', '4');
	});

	it('starts the game when clicking the Start button', () => {
		cy.get('#start-game').click();
		cy.url().should('include', '/game');
	});
});
