describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('should open main page by default', function() {
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('should open recursion page from menu by clickin on div link', function() {
    cy.get('a[href*="recursion"]').click();
    cy.contains('Строка');
  });

  it('should open agreement page after continue button click', function() {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('should open agreement page after continue button click', function() {
    cy.get('a[href*="sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('should open agreement page after continue button click', function() {
    cy.get('a[href*="stack"]').click();
    cy.contains('Стек');
  });

  it('should open agreement page after continue button click', function() {
    cy.get('a[href*="queue"]').click();
    cy.contains('Очередь');
  });

  it('should open agreement page after continue button click', function() {
    cy.get('a[href*="list"]').click();
    cy.contains('Связный список');
  });
});
