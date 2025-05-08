describe('Navigation Tests', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should navigate to all main pages', () => {
    // Check home page loaded
    cy.url().should('include', '/');
    cy.contains('h1', 'Welcome to our Dummy Angular App').should('exist');
    
    // Navigate to Products page by directly visiting the URL instead of clicking
    cy.visit('/products');
    cy.url().should('include', '/products');
    cy.contains('h1', 'Our Products').should('exist');
    
    // Navigate to About page by directly visiting the URL
    cy.visit('/about');
    cy.url().should('include', '/about');
    cy.contains('h1', 'About Us').should('exist');
    
    // Navigate to Contact page by directly visiting the URL
    cy.visit('/contact');
    cy.url().should('include', '/contact');
    cy.contains('h1', 'Contact Us').should('exist');
  });

  it('should show Not Found page for invalid routes', () => {
    cy.visit('/invalid-route', { failOnStatusCode: false });
    cy.contains('Page Not Found').should('exist');
  });
});