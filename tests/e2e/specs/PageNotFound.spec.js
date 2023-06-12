describe('PageNotFound', () => {
	beforeEach(() => {
		cy.visit('/nonexistent-page');
	});

	it('renders the page correctly', () => {
		cy.contains('h1', 'Page not found');
		cy.contains('h2', '404');
	});
});
