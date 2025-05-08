// API mocking utilities for system testing

/**
 * Mock the product API responses
 */
export function mockProductApis() {
  // Mock the products list endpoint
  cy.intercept('GET', '**/api/products', { 
    fixture: 'products.json'
  }).as('getProducts');
  
  // Mock single product endpoints
  cy.intercept('GET', '**/api/products/*', (req) => {
    // Extract the product ID from the URL
    const productId = req.url.split('/').pop();
    
    // Load the products fixture
    cy.fixture('products.json').then((products) => {
      // Find the requested product
      const product = products.find((p) => p.id === productId);
      
      if (product) {
        req.reply({ statusCode: 200, body: product });
      } else {
        req.reply({ statusCode: 404, body: { message: 'Product not found' } });
      }
    });
  }).as('getProductDetail');
}

/**
 * Mock authentication APIs
 */
export function mockAuthApis() {
  // Mock successful login
  cy.intercept('POST', '**/api/auth/login', (req) => {
    const { email, password } = req.body;
    
    // Very simplistic validation for demo purposes
    if (email === 'test@example.com' && password === 'password123') {
      req.reply({
        statusCode: 200,
        body: {
          token: 'fake-jwt-token',
          user: {
            id: 1,
            email,
            name: 'Test User'
          }
        }
      });
    } else {
      req.reply({
        statusCode: 401,
        body: {
          message: 'Invalid credentials'
        }
      });
    }
  }).as('login');
  
  // Mock logout endpoint
  cy.intercept('POST', '**/api/auth/logout', {
    statusCode: 200,
    body: { success: true }
  }).as('logout');
}