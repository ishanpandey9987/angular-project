// Import the API mocks
import { mockProductApis } from '../support/api-mocks';

describe('Product Flow Tests', () => {
  beforeEach(() => {
    // Set up API mocks before each test
    mockProductApis();
    
    // Visit the products page
    cy.visit('/products');
  });

  it('should display a list of products', () => {
    // Check if products are displayed - using the data-cy attributes we added
    cy.get('[data-cy="product-list"]').should('exist');
    cy.get('[data-cy="product-item"]').should('have.length.at.least', 1);
  });

  it('should navigate to product detail page when a product is clicked', () => {
    // Click on the view details button of the first product
    cy.get('[data-cy="view-details-button"]').first().click();
    
    // Should be on a product detail page
    cy.url().should('include', '/products/');
    
    // Product details should be displayed
    cy.get('[data-cy="product-detail"]').should('exist');
    cy.get('[data-cy="product-name"]').should('exist');
    cy.get('[data-cy="product-price"]').should('exist');
    cy.get('[data-cy="product-description"]').should('exist');
  });

  // Only include this test if product filtering is implemented
  it.skip('should handle product filtering if implemented', () => {
    // This test is skipped until filtering functionality is implemented
    // Example of how it would work:
    // cy.get('[data-cy="product-filter"]').type('test product');
    // cy.get('[data-cy="filter-button"]').click();
    // cy.get('[data-cy="product-item"]').should('exist');
  });
});