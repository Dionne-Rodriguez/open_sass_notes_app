//problem to fix, this test will only pass properly once, because once an account is made, a duplicate account isn't allowed. 
//Both for this and for login page, we need to create an API that works with the wasp project to clear the DB so we can use one set of username/password and so we can hand in authorization for login page test.
//for now, signup page test only fully passes if its the first time, or if you go into prisma db and delete the existing user or if you restart wasp db in terminal
describe('Signup Page', () => {
  beforeEach(() => {
    // Visit the signup page
    cy.visit('http://localhost:3000/signup'); 
})

  it('should display the signup form page properly', () => {
    // Ensure that the signup form elements are visible
    cy.get('form').should('exist'); //the SignupForm is wrapped in a form element
    cy.url().should('include', '/'); // if user has already an account render to login 

    cy.contains("I already have an account").should('exist'); // Assuming the "I already have an account" text exists
    cy.contains('go to login').should('exist'); // Assuming the link to login exists
  });

  it('should allow users to sign up valid accounts and be redirected to demo app', () => {

    cy.get('input[name="username"]').type('correctUsername')
    cy.get('input[name="password"]').type('correctPassword123');
    cy.get('button').click();
    cy.url().should('include', 'demo-app')
  });

  it('should validate their account submission attempts', () => {
    // Ensure that the signup form doesnt let you submit a password thats only text
    cy.get('input[name="username"]').type('correctUsername')
    cy.get('input[name="password"]').type('correctPassword');
    cy.get('button').click();
    cy.contains('password must contain a number').should('be.visible');

    //ensure repeat password isn't allowed
    cy.get('input[name="password"]').type('correctPassword123');
    cy.get('button').click();
    cy.contains('Save failed: user with the same identity already exists').should('be.visible');
  });

    
});