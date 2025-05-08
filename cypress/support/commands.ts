// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): typeof login;
    logout(): typeof logout;
    checkProductDetails(productId: string): typeof checkProductDetails;
  }
}

// Custom command for login
function login(email: string, password: string): void {
  cy.visit('/login');
  cy.get('[data-cy="email"]').type(email);
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="login-submit"]').click();
  cy.url().should('not.include', '/login');
}

// Custom command for logout
function logout(): void {
  cy.get('[data-cy="user-menu"]').click();
  cy.get('[data-cy="logout"]').click();
  cy.url().should('include', '/');
}

// Custom command to check product details
function checkProductDetails(productId: string): void {
  cy.visit(`/product/${productId}`);
  cy.get('.product-detail').should('exist');
  cy.get('.product-name').should('exist');
  cy.get('.product-price').should('exist');
}

// Register the custom commands
Cypress.Commands.add('login', login);
Cypress.Commands.add('logout', logout);
Cypress.Commands.add('checkProductDetails', checkProductDetails);

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
