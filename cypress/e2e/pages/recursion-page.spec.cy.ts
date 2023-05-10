describe('recursion page works correctly', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('if placeholder is empty, button is disabled', function() {
    cy.get('a[href*="recursion"]').click();
    cy.get('input[placeholder*="Введите текст"]').should('contain', '');
    cy.get('button').last().should('be.disabled');
  });

  it('if string reverse correctly', function() {
    cy.get('a[href*="recursion"]').click();
    cy.get('input[placeholder*="Введите текст"]').type('abcde');
    cy.get('button').eq(1).click();

    cy.get('[class*="circle_circle"]').eq(0).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('[class*="circle_circle"]').eq(1).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('[class*="circle_circle"]').eq(2).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('[class*="circle_circle"]').eq(3).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('[class*="circle_circle"]').eq(4).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
  });
});
