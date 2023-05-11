describe('list page works correctly', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('all buttons disabled states are ok', function() {
    cy.get('a[href*="list"]').click();

    cy.get('input[placeholder*="Введите значение"]').as('value-input');
    cy.get('input[placeholder*="Введите индекс"]').as('index-input');
    cy.get('button').as('buttons');

    cy.get('@value-input').clear();
    cy.get('@index-input').clear();

    cy.get('@buttons').eq(1).should('be.disabled');
    cy.get('@buttons').eq(2).should('be.disabled');
    cy.get('@buttons').eq(3).should('not.be.disabled');
    cy.get('@buttons').eq(4).should('not.be.disabled');
    cy.get('@buttons').eq(5).should('be.disabled');
    cy.get('@buttons').eq(6).should('be.disabled');


    cy.get('@value-input').type('5');
    cy.get('@index-input').clear();
    cy.get('@buttons').eq(1).should('not.be.disabled');
    cy.get('@buttons').eq(2).should('not.be.disabled');
    cy.get('@buttons').eq(3).should('not.be.disabled');
    cy.get('@buttons').eq(4).should('not.be.disabled');
    cy.get('@buttons').eq(5).should('be.disabled');
    cy.get('@buttons').eq(6).should('be.disabled');


    cy.get('@value-input').clear();
    cy.get('@index-input').type('0');
    cy.get('@buttons').eq(1).should('be.disabled');
    cy.get('@buttons').eq(2).should('be.disabled');
    cy.get('@buttons').eq(3).should('not.be.disabled');
    cy.get('@buttons').eq(4).should('not.be.disabled');
    cy.get('@buttons').eq(5).should('be.disabled');
    cy.get('@buttons').eq(6).should('not.be.disabled');


    cy.get('@value-input').type('5');
    cy.get('@buttons').eq(1).should('not.be.disabled');
    cy.get('@buttons').eq(2).should('not.be.disabled');
    cy.get('@buttons').eq(3).should('not.be.disabled');
    cy.get('@buttons').eq(4).should('not.be.disabled');
    cy.get('@buttons').eq(5).should('not.be.disabled');
    cy.get('@buttons').eq(6).should('not.be.disabled');
  });

  it('default list is ok', function() {
    cy.get('a[href*="list"]').click();
    cy.get('[class*="circle_letter"]').as('circles');

    cy.get('@circles').eq(0).should('contain', '0');
    cy.get('@circles').eq(1).should('contain', '34');
    cy.get('@circles').eq(2).should('contain', '8');
    cy.get('@circles').eq(3).should('contain', '1');
  });

  it('add head in list is ok', function() {
    cy.get('a[href*="list"]').click();

    cy.get('input[placeholder*="Введите значение"]').as('value-input');
    cy.get('@value-input').type('7');

    cy.get('button').eq(1).click();

    cy.get('[class*="circle_letter"]').eq(0).should('contain', '7');
  });

  it('add tail in list is ok', function() {
    cy.get('a[href*="list"]').click();

    cy.get('input[placeholder*="Введите значение"]').as('value-input');
    cy.get('@value-input').type('7');

    cy.get('button').eq(2).click();

    cy.get('[class*="circle_letter"]').eq(4).should('contain', '7');
  });

  it('add by index is ok', function() {
    cy.get('a[href*="list"]').click();

    cy.get('input[placeholder*="Введите значение"]').as('value-input');
    cy.get('input[placeholder*="Введите индекс"]').as('index-input');


    cy.get('@value-input').type('7');
    cy.get('@index-input').type('3');

    cy.get('button').eq(5).click();

    cy.get('[class*="circle_letter"]').eq(3).should('contain', '7');
  });

  it('delete head is ok', function() {
    cy.get('a[href*="list"]').click();
    cy.get('button').eq(3).click();

    cy.get('[class*="circle_letter"]').eq(0).should('contain', '34');
  });

  it('delete tail is ok', function() {
    cy.get('a[href*="list"]').click();
    cy.get('button').eq(4).click();

    cy.get('[class*="circle_letter"]').should('have.length', 3);
  });

  it('add by index is ok', function() {
    cy.get('a[href*="list"]').click();

    cy.get('input[placeholder*="Введите индекс"]').as('index-input');

    cy.get('@index-input').type('1');

    cy.get('button').eq(6).click();

    cy.get('[class*="circle_letter"]').eq(1).should('contain', '8');
  });
})
