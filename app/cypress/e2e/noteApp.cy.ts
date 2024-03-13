it('Log in into notes app', () => {
cy.visit('http://localhost:3000/demo-app')
   
  
  

    // Check if the sign-up message or confirmation is displayed
    cy.contains('Add Note').should('be.visible');
  });