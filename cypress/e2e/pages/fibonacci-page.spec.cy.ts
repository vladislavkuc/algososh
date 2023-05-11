describe('fibonacci page works correctly', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('if placeholder is empty, button is disabled', function() {
    cy.get('a[href*="fibonacci"]').click();
    cy.get('input[placeholder*="Введите текст"]').should('contain', '');
    cy.get('button').last().should('be.disabled');
  });

  it('numbers calculated correctly', function() {
    cy.get('a[href*="fibonacci"]').click();
    cy.get('input[placeholder*="Введите текст"]').type('4');
    cy.get('button').eq(1).click();
    cy.get('[class*="text_type_circle"]').as('circles');

    cy.get('@circles').eq(0).should('contain', '1');
    cy.get('@circles').eq(1).should('contain', '1');
    cy.get('@circles').eq(2).should('contain', '2');
    cy.get('@circles').eq(3).should('contain', '3');
    cy.get('@circles').eq(4).should('contain', '5');
  });
})
