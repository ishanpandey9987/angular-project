// Import API mocks
import { mockProductApis, mockAuthApis } from '../support/api-mocks';

describe('Visual Regression Tests', () => {
  beforeEach(() => {
    // Set up API mocks
    mockProductApis();
    mockAuthApis();
  });

  it('Homepage should match visual snapshot', () => {
    cy.visit('/');
    // Take a snapshot after content is fully loaded
    cy.wait(1000); // Longer wait to ensure all animations/transitions complete
    cy.matchImageSnapshot('homepage');
  });

  it('Products page should match visual snapshot', () => {
    cy.visit('/products');
    // No need to wait for API call as our simplified snapshot approach doesn't check this
    cy.wait(1000); // Longer wait for rendering
    cy.matchImageSnapshot('products-page');
  });

  it('Product detail page should match visual snapshot', () => {
    // Visit a specific product detail page with the correct URL format
    cy.visit('/products/1');
    // No need to wait for API call
    cy.wait(1000); // Longer wait for rendering
    cy.matchImageSnapshot('product-detail-page');
  });

  it('Contact page should match visual snapshot', () => {
    cy.visit('/contact');
    cy.wait(1000); // Longer wait for rendering
    cy.matchImageSnapshot('contact-page');
  });

  it('About page should match visual snapshot', () => {
    cy.visit('/about');
    cy.wait(1000); // Longer wait for rendering
    cy.matchImageSnapshot('about-page');
  });
});