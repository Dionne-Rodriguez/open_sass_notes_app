import '../support/commands';

describe('Login Page', () => {
  it('should display the login form, handle incorrect login, and redirect to signup page', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/');

    // Ensure that the login form elements are visible
    cy.get('form').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').contains('Login').should('exist');
    cy.contains("Don't have an account yet?").should('exist');
    cy.contains('go to signup').should('exist');
    cy.contains('Forgot your password?').should('exist');
    cy.contains('reset it').should('exist');

    // Attempt incorrect login
    cy.get('input[name="username"]').type('incorrect_username');
    cy.get('input[name="password"]').type('incorrect_password');
    cy.contains('Login').click();
    cy.contains('Invalid username or password').should('be.visible');

    // Redirect to signup page
    cy.contains('go to signup').click();
    cy.url().should('include', '/signup');

 
    // Visit the specified URL
    cy.visit('http://localhost:3001/auth/me');

    // Assertion for successful navigation to the authenticated URL
    cy.contains('Welcome to the authenticated page').should('be.visible');
  });
});
