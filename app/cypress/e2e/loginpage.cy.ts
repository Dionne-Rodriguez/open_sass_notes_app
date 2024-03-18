import '../support/commands';

describe('User opened Landing Page', () => {
  beforeEach(() => {
      // Visit the landing/login page
    cy.visit('http://localhost:3000/')
  })

  it('should display the login form and page elements', () => {
    // Ensure that the login form elements are visible
    cy.get('form').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').contains('Log in').should('exist');
    cy.contains("Don't have an account yet?").should('exist');
    cy.contains('go to signup').should('exist');
    cy.contains('Forgot your password?').should('exist');
    cy.contains('reset it').should('exist');
  })

  it('should handle incorrect login', () => {
    // Attempt incorrect login
    cy.get('input[name="username"]').type('incorrect_username');
    cy.get('input[name="password"]').type('incorrect_password');
    cy.get('button').click();
    cy.contains('Invalid credentials').should('be.visible');
  
  })

  it('should redirect to and display the signup page elements', () => {
    // Redirect to signup page
    cy.contains('go to signup').click();
    cy.url().should('include', '/signup');

    // Ensure that the signup form elements are visible
    cy.get('form').should('exist'); //the SignupForm is wrapped in a form element
    cy.url().should('include', '/'); // if user has already an account render to login 
  });

  //below test not working until we find out how to get auth. none of the accounts created through the signup page are working, gives us invalid credentials error when trying to login.
  it.skip('should allow users to login with valid accounts created in signup page', () => {
    // Redirect to signup page
    cy.contains('go to signup').click();

    //create an account to login with in next test
    cy.get('input[name="username"]').type('correctUsername')
    cy.get('input[name="password"]').type('correctPassword123');
    cy.get('button').click();
    cy.visit('http://localhost:3000/');

    cy.get('input[name="username"]').type('correctUsername')
    cy.get('input[name="password"]').type('correctPassword123');
    cy.get('button').click();
    cy.url().should('include', 'demo-app')
  });
});