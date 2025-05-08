import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// Helper function to create a delay
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('AppComponent', () => {
  // Increase timeout for all tests in this suite
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000; // 15 seconds
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', async () => {
    console.log('Starting test: should create the app');
    await delay(1000); // Initial delay for test start
    
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    
    await delay(1500); // Delay after assertion
    
    // Add visual indicator for this test
    const el = document.createElement('div');
    el.innerHTML = '✅ App component created successfully';
    el.style.backgroundColor = '#dff0d8';
    el.style.padding = '10px';
    el.style.margin = '5px';
    document.body.appendChild(el);
    
    await delay(1000); // Final delay before next test
  });

  it(`should have the 'dummy-angular-app' title`, async () => {
    console.log('Starting test: should have the correct title');
    await delay(1000); // Initial delay for test start
    
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    await delay(1000); // Delay before assertion
    expect(app.title).toEqual('dummy-angular-app');
    
    await delay(1500); // Delay after assertion
    
    // Add visual indicator for the title test
    const el = document.createElement('div');
    el.innerHTML = `✅ Title is correctly set to '${app.title}'`;
    el.style.backgroundColor = '#dff0d8';
    el.style.padding = '10px';
    el.style.margin = '5px';
    document.body.appendChild(el);
    
    await delay(1000); // Final delay before next test
  });

  it('should render title', async () => {
    console.log('Starting test: should render title');
    await delay(1000); // Initial delay for test start
    
    const fixture = TestBed.createComponent(AppComponent);
    
    await delay(800); // Delay before detecting changes
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const titleText = compiled.querySelector('h1')?.textContent;
    
    await delay(1000); // Delay before assertion
    expect(titleText).toContain('Hello, dummy-angular-app');
    
    await delay(1500); // Delay after assertion
    
    // Show component output for visual inspection
    const el = document.createElement('div');
    el.innerHTML = '<h3>Component Rendering Test:</h3>';
    el.style.backgroundColor = '#d9edf7';
    el.style.padding = '10px';
    el.style.margin = '5px';
    
    const componentOutput = document.createElement('div');
    componentOutput.innerHTML = `
      <p>Expected to see: "Hello, dummy-angular-app"</p>
      <p>Actual component output:</p>
      <div style="border: 1px solid #bce8f1; padding: 10px;">${compiled.innerHTML}</div>
    `;
    
    el.appendChild(componentOutput);
    document.body.appendChild(el);
    
    await delay(2000); // Final longer delay to see the results
  });
});
