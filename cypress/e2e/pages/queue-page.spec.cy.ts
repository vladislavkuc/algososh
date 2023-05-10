describe('queue page works correctly', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3001');
  });

  it('if placeholder is empty, button is disabled', function() {
    cy.get('a[href*="queue"]').click();
    cy.get('input[placeholder*="Введите текст"]').should('contain', '');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('queue must be empty after clicking on remove button', function() {
    cy.get('a[href*="queue"]').click();
    cy.get('input[placeholder*="Введите текст"]').as('input');

    cy.get('@input').type('5');
    cy.get('button').eq(1).click();

    cy.get('@input').type('6');
    cy.get('button').eq(1).click();

    cy.get('button').last().click();
    cy.get('[class*="text_type_circle"]').each($circle => cy.wrap($circle).should('be.empty'));
  });

  it('queue head and tail renders correctly', function() {
    cy.get('a[href*="queue"]').click();
    cy.get('input[placeholder*="Введите текст"]').as('input');

    cy.get('@input').type('5');
    cy.get('button').eq(1).click();

    cy.get('@input').type('1');
    cy.get('button').eq(1).click();

    cy.get('@input').type('3');
    cy.get('button').eq(1).click();

    cy.get('[class*="circle_head"]').eq(0).should('contain', 'head');
    cy.get('[class*="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('[class*="circle_tail"]').eq(2).should('contain', 'tail');
  });
})
