// Import API mocks
import { mockProductApis } from '../support/api-mocks';

describe('Complete User Journey', () => {
  beforeEach(() => {
    // Set up API mocks
    mockProductApis();
    
    // Start on the home page
    cy.visit('/');
  });

  it('should support a basic user browsing journey', () => {
    // Step 1: Check home page is correctly displayed
    cy.contains('h1', 'Welcome to our Dummy Angular App').should('exist');
    
    // Step 2: User navigates to products page from navigation
    cy.get('.nav-links a').contains('Products').click();
    cy.url().should('include', '/products');
    cy.contains('h1', 'Our Products').should('exist');
    
    // Step 3: User views product details
    cy.get('[data-cy="view-details-button"]').first().click();
    cy.url().should('include', '/products/');
    
    // Step 4: Verify product details are shown
    cy.get('[data-cy="product-detail"]').should('exist');
    cy.get('[data-cy="product-name"]').should('exist');
    cy.get('[data-cy="product-price"]').should('exist');
    
    // Step 5: User navigates to About page
    cy.get('.nav-links a').contains('About').click();
    cy.url().should('include', '/about');
    cy.contains('h1', 'About Us').should('exist');
    
    // Step 6: User navigates to Contact page
    cy.get('.nav-links a').contains('Contact').click();
    cy.url().should('include', '/contact');
    cy.contains('h1', 'Contact Us').should('exist');
    
    // Step 7: User returns to home page
    cy.get('.nav-links a').contains('Home').click();
    cy.url().should('include', '/home');
    cy.contains('h1', 'Welcome to our Dummy Angular App').should('exist');
  });
});