//these tests wont work until we can get cypress to do a proper login
it.skip('show notes app page', () => {
  // Visit the notes app
  cy.visit('http://localhost:3000/demo-app');

  // Check if there are notes
  cy.get('.notes').then(($notes) => {
    if ($notes.length > 0) {
      // If there are notes
      cy.contains('Notes found').should('be.visible');
    } else {
      // If there are no notes
      cy.contains('No notes found').should('be.visible');
    }
  });

  // Click on the "Add Notes" button
  cy.contains('Add Notes').click();

  // Check if the add notes modal is visible
  cy.get('.modal').should('be.visible');
});
