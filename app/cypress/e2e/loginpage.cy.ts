describe('Login Page', () => {
  it('should display the login form', () => {
    cy.visit('http://localhost:3000/'); // Visit the login page

    // Ensure that the login form elements are visible
    cy.get('form').should('exist'); // Assuming the LoginForm is wrapped in a form element
    cy.get('input[name="username"]').should('exist'); // Assuming the username input field exists
    cy.get('input[name="password"]').should('exist'); // Assuming the password input field exists
    cy.get('button[type="submit"]').contains('Login').should('exist'); // Assuming the login button exists
    cy.contains("Don't have an account yet?").should('exist'); // Assuming the "Don't have an account yet?" text exists
    cy.contains('go to signup').should('exist'); // Assuming the link to signup exists
    cy.contains('Forgot your password?').should('exist'); // Assuming the "Forgot your password?" text exists
    cy.contains('reset it').should('exist'); // Assuming the link to reset password exists
  });

  // Add more test cases as needed to cover different scenarios
});
