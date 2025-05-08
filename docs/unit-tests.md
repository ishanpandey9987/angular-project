# Unit Testing Documentation

## Overview
This document describes the unit testing approach used in the Dummy Angular App. Unit tests focus on testing individual components, services, and functions in isolation.

## Technologies Used
- **Jasmine**: Testing framework
- **Karma**: Test runner
- **Angular Testing Utilities**: TestBed, ComponentFixture, etc.

## Test Structure

### Services
Services are tested in isolation with their dependencies mocked. Each service has its own test file with the naming convention `[service-name].service.spec.ts`.

#### Auth Service
File: `src/app/services/auth.service.spec.ts`

Tests cover:
- User authentication (login/logout)
- Token storage and retrieval
- Authentication state management

#### Product Service
File: `src/app/services/product.service.spec.ts`

Tests cover:
- Product retrieval
- Single product details
- Product filtering/searching

### Components
Components are tested using Angular's `ComponentFixture` with the naming convention `[component-name].component.spec.ts`.

#### Tests for each component include:
- Component creation and initialization
- Input/Output property binding
- Template rendering
- Event handlers and user interactions
- Form validations (where applicable)
- Component state changes

## Running Unit Tests
To run unit tests:

```bash
# Run all unit tests
npm test

# Run unit tests with coverage report
npm run test:coverage

# Run a specific test file
ng test --include=**/products.component.spec.ts
```

## Code Coverage
Code coverage reports are generated in the `/coverage` directory. Our goal is to maintain at least 80% code coverage for all components and services.

## Best Practices
1. **Isolation**: Test each unit in isolation with dependencies mocked
2. **Single Responsibility**: Each test should test one specific behavior
3. **Descriptive Names**: Use descriptive test names that explain what is being tested
4. **Setup/Teardown**: Use beforeEach/afterEach for test setup and teardown
5. **Avoid Logic**: Tests should not contain complex logic
6. **Mocks**: Use spies and mock services to isolate the unit under test

## Sample Unit Test

```typescript
describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all products', () => {
    const dummyProducts = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne('api/products');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });
});
```