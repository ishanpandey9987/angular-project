# UI Testing Documentation

## Overview
This document describes the UI testing approach for the Dummy Angular App. UI tests focus on testing component rendering, user interactions, and visual aspects of the application.

## Technologies Used
- **Cypress Component Testing**: For isolated component testing
- **Angular TestBed**: For component integration testing
- **Visual Regression**: For detecting visual changes

## Component Testing Strategy

### Types of UI Tests

#### 1. Component Unit Tests
Test individual components in isolation using Angular's TestBed.

#### 2. Component Integration Tests
Test component interactions with their child components.

#### 3. Visual Regression Tests
Test the visual appearance of components to detect unintended changes.

## Test Structure

### Component Tests
Each component has its own test file with the naming convention `[component-name].component.spec.ts`.

Tests cover:
- Correct rendering of the component's UI elements
- CSS class application based on component state
- Conditional rendering logic
- Component styling and layout
- Responsive design behavior
- Accessibility conformance

### Cypress Component Tests
Cypress component tests are located in the component's directory with naming convention `[component-name].cy.ts`.

Tests cover:
- User interactions (clicks, form submissions, etc.)
- Component state changes in response to user interactions
- Component styling and appearance
- Dynamic UI updates

## Data-Cy Attributes
For reliable UI testing, we use `data-cy` attributes to select elements:

```html
<button data-cy="submit-button">Submit</button>
```

These attributes help keep tests robust against CSS or text content changes.

## Visual Testing
Visual tests compare snapshots of components to detect visual regressions:

- Screenshots are stored in `cypress/screenshots/`
- Visual comparison is performed using Cypress visual testing utilities

## Running UI Tests

```bash
# Run all component tests with Cypress
npm run cypress:run -- --component

# Run a specific component test
npm run cypress:run -- --component --spec "src/app/components/products/products.cy.ts"

# Run in interactive mode
npm run cypress:open -- --component
```

## Best Practices

1. **Use data-cy attributes**: Add data-cy attributes to important UI elements for reliable testing
2. **Isolate CSS**: Make sure component styles don't leak and affect other components
3. **Test responsive states**: Test components at different viewport sizes
4. **Visual baselines**: Update visual baselines when intentionally changing component appearance
5. **Accessibility**: Include tests for accessibility standards compliance

## Sample UI Component Test

```typescript
describe('ProductComponent', () => {
  it('should display product information correctly', () => {
    // Mount the component with test data
    cy.mount(ProductComponent, {
      componentProperties: {
        product: {
          id: '1',
          name: 'Test Product',
          price: 49.99,
          description: 'This is a test product'
        }
      }
    });

    // Check that the product information is displayed correctly
    cy.get('[data-cy="product-name"]').should('contain', 'Test Product');
    cy.get('[data-cy="product-price"]').should('contain', '$49.99');
    cy.get('[data-cy="product-description"]').should('contain', 'This is a test product');

    // Test interaction - clicking the "Add to Cart" button
    cy.get('[data-cy="add-to-cart"]').click();
    cy.get('[data-cy="added-to-cart-message"]').should('be.visible');
  });

  it('should match visual snapshot', () => {
    cy.mount(ProductComponent, {
      componentProperties: {
        product: {
          id: '1',
          name: 'Test Product',
          price: 49.99,
          description: 'This is a test product'
        }
      }
    });
    
    // Take a visual snapshot for regression testing
    cy.matchImageSnapshot('product-component');
  });
});
```