describe('PlayGame', () => {
	beforeEach(() => {
		cy.visit('/game');
	});

	it('displays the playing field and sidebar', () => {
		cy.get('.container').should('be.visible');
		cy.get('.panel__right').should('be.visible');

		cy.get('.food').should('have.length', 1);
	});

	it('resets the game and updates the score', () => {
		cy.get('#sidebar-btn-reset-game').click();

		cy.get('[data-cy="score"]').should('have.text', 'Score: 0');
	});

	it('resets the record', () => {
		cy.get('#sidebar-btn-reset-record').click();

		cy.get('[data-cy="record"]').should('have.text', 'Your best result: There is no high score');
	});

	it('shifts head coordinates to the right when you press the right key', () => {
		// Get the initial coordinates of head
		cy.get('.snake-head').then($snakeHead => {
			const initialX = $snakeHead.attr('data-x');
			const initialY = $snakeHead.attr('data-y');

			// Press the right key
			cy.get('body').type('{rightarrow}');

			// Check that coordinate X of head increased by 1
			cy.get('.snake-head').should($snakeHead => {
				const newX = $snakeHead.attr('data-x');
				expect(parseInt(newX)).to.equal(parseInt(initialX) + 1);
			});

			// Check that the coordinate Y of head remained unchanged
			cy.get('.snake-head').should($snakeHead => {
				const newY = $snakeHead.attr('data-y');
				expect(newY).to.equal(initialY);
			});
		});
	});

	it('Detects collision', () => {
		cy.get('body').type('{rightarrow}');

		cy.get('.snake-head').then($head => {
			const { x, y } = $head.data();

			cy.get(`[data-x=${x + 1}][data-y=${y}]`).invoke('addClass', 'snake-body');

			cy.get('.snake-head').as('head');
			cy.get('.container').find('.snake-body').as('body');
			cy.get('@head').then($head => {
				const { x, y } = $head.data();
				cy.get('.container')
					.find(`[data-x="${x + 1}"][data-y="${y}"]`)
					.as('collisionBlock');
			});
		});
	});

	it('Views home page when clicking the Return to home page link', () => {
		cy.get('.sidebar__link').click();
		cy.url().should('include', '/');
	});
});
