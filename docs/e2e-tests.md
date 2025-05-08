# End-to-End (E2E) Testing Documentation

## Overview
This document describes the End-to-End (E2E) testing approach for the Dummy Angular App. E2E tests validate the complete application workflow from the user's perspective, ensuring that all components work together as expected.

## Technologies Used
- **Cypress**: E2E testing framework
- **API Mocking**: For predictable test data
- **Visual Regression**: For detecting visual changes across the entire application

## Test Structure

### E2E Test Files
E2E tests are located in the `cypress/e2e/` directory with the `.cy.ts` extension.

#### Key test files:
- `navigation.cy.ts`: Tests basic navigation flow across the app
- `products.cy.ts`: Tests product-related flows
- `auth.cy.ts`: Tests authentication flows
- `user-journey.cy.ts`: Tests complete user journeys
- `visual.cy.ts`: Tests for visual regression across all main pages

### API Mocking
API responses are mocked using fixtures and Cypress intercept to ensure tests run consistently:

- Mock implementation: `cypress/support/api-mocks.ts`
- Mock data: `cypress/fixtures/*.json`

## Data-Cy Attributes
For reliable E2E testing, we use `data-cy` attributes to select elements:

```html
<button data-cy="add-to-cart">Add to Cart</button>
```

## Visual Testing
Full-page snapshots are taken to detect visual regressions across the application:

- Screenshots are stored in `cypress/screenshots/`

## Test Scenarios

### 1. Navigation Tests
Tests all navigation paths across the application:
- Home page loading
- Menu navigation to all main sections
- URL validation
- 404 page behavior

### 2. Product Flow Tests
Tests the product browsing and viewing experience:
- Product listing display
- Product filtering/sorting
- Product detail view
- Related products

### 3. Authentication Tests
Tests the user authentication flow:
- Login process
- Logout process
- Protected route access
- Authentication persistence

### 4. User Journey Tests
Tests complete workflows that users are expected to perform:
- Browsing products
- Viewing product details
- Navigation between major app sections

### 5. Visual Regression Tests
Ensures the application's appearance remains consistent:
- Home page
- Products page
- Product detail page
- About and Contact pages

## Running E2E Tests

```bash
# Start the app and run all E2E tests
npm run system-test

# Run specific E2E test files
npm run cypress:run -- --spec "cypress/e2e/navigation.cy.ts"

# Run visual regression tests
npm run visual-test

# Update visual snapshots when UI changes are intentional
npm run visual-test:update

# Open Cypress Test Runner for interactive testing
npm run cypress:open
```

## Best Practices

1. **Independent Tests**: Each test should be capable of running independently
2. **Mock External Dependencies**: Use API mocking for predictable behavior
3. **Test Real User Flows**: Design tests that mirror actual user behavior
4. **Reliable Selectors**: Use data-cy attributes to make tests resilient to UI changes
5. **Visual Validation**: Include visual testing to catch styling regressions
6. **Performance**: Monitor test execution time to keep test suite efficient

## Sample E2E Test

```typescript
// navigation.cy.ts
describe('Navigation Tests', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should navigate to all main pages', () => {
    // Check home page loaded
    cy.url().should('include', '/');
    cy.contains('h1', 'Welcome to our Dummy Angular App').should('exist');
    
    // Navigate to Products page by directly visiting the URL
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
```

## Continuous Integration
E2E tests are integrated into the CI/CD pipeline to catch regressions before deployment:

- Tests run on every pull request
- Screenshots are saved as artifacts for visual review
- Test failures block deployment of failing code