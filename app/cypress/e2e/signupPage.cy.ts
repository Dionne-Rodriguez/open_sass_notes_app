describe('Signup Page', () => {
  it('should display the signup form', () => {
    cy.visit('http://localhost:3000/signup'); // Visit the signup page

    // Ensure that the signup form elements are visible
    cy.get('form').should('exist'); //the SignupForm is wrapped in a form element
    cy.url().should('include', '/'); // if user has already an account render to login
    cy.url().should('include', '/demo-app'); //Notes apppRendering
 

    cy.contains("I already have an account").should('exist'); // Assuming the "I already have an account" text exists
    cy.contains('go to login').should('exist'); // Assuming the link to login exists
  });

  // Add more test cases as needed to cover different scenarios
});