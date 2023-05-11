describe('stack page works correctly', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('if input is empty, button is disabled', function() {
    cy.get('a[href*="stack"]').click();
    cy.get('input[placeholder*="Введите текст"]').should('contain', '');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('stack must be empty after clicking on remove button', function() {
    cy.get('a[href*="stack"]').click();
    cy.get('input[placeholder*="Введите текст"]').as('input');
    cy.get('button').as('buttons');

    cy.get('@input').type('5');
    cy.get('@buttons').eq(1).click();

    cy.get('@input').type('6');
    cy.get('@buttons').eq(1).click();

    cy.get('@buttons').last().click();
    cy.get('div').eq(5).children().should('have.length', 0);
  });

  it('check stack styles', function() {
    cy.get('a[href*="stack"]').click();
    cy.get('input[placeholder*="Введите текст"]').as('input');
    cy.get('button').as('buttons');

    cy.get('@input').type('5');
    cy.get('@buttons').eq(1).click();

    cy.get('@input').type('1');
    cy.get('@buttons').eq(1).click();

    cy.get('@input').type('3');
    cy.get('@buttons').eq(1).click();

    cy.get('[class*="circle_circle"]').as('circles');

    cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@circles').eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@circles').eq(2).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  });
});
