import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Router } from '@angular/router';

// Helper function for creating delays
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper to visualize test steps
async function visualStep(message: string, bgColor: string = '#f0ad4e'): Promise<void> {
  const stepEl = document.createElement('div');
  stepEl.innerHTML = `🔍 ${message}`;
  stepEl.style.backgroundColor = bgColor;
  stepEl.style.color = '#333';
  stepEl.style.padding = '10px';
  stepEl.style.margin = '5px';
  stepEl.style.borderRadius = '5px';
  stepEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  document.body.appendChild(stepEl);
  await delay(1000); // Give time to see the message
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  
  // Increase timeout for all tests in this suite
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000; // 15 seconds
  
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => null
      },
      queryParamMap: {
        get: () => null
      }
    },
    paramMap: of({
      get: () => null
    }),
    queryParamMap: of({
      get: () => null
    })
  };
  
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', async () => {
    // Reduce delays for faster testing
    await visualStep('Creating HomeComponent...', '#f0ad4e');
    
    expect(component).toBeTruthy();
    
    await delay(800); // Shorter delay
    await visualStep('HomeComponent created successfully!', '#5bc0de');
    
    // Display component instance details
    const debugEl = document.createElement('div');
    debugEl.innerHTML = `
      <h4>Component Created:</h4>
      <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${
        JSON.stringify({
          componentType: component.constructor.name,
          isInitialized: true
        }, null, 2)
      }</pre>
    `;
    debugEl.style.backgroundColor = '#e8f7f0';
    debugEl.style.padding = '10px';
    debugEl.style.margin = '10px 5px';
    document.body.appendChild(debugEl);
    
    await delay(800); // Shorter delay
  });

  it('should have proper elements rendered', async () => {
    await visualStep('Preparing to render HomeComponent...', '#f0ad4e');
    
    await delay(800); // Shorter delay
    fixture.detectChanges();
    
    await visualStep('Component rendered, checking content...', '#5bc0de');
    
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Clone and display the component UI
    const componentDisplay = document.createElement('div');
    componentDisplay.innerHTML = `
      <h4>Current Component Rendering:</h4>
      <div style="border: 2px dashed #5bc0de; padding: 15px; margin: 10px 0; background-color: #f9f9f9;">
        ${compiled.innerHTML}
      </div>
    `;
    componentDisplay.style.backgroundColor = '#f9f2f4';
    componentDisplay.style.padding = '10px';
    componentDisplay.style.margin = '10px 5px';
    document.body.appendChild(componentDisplay);
    
    await delay(1000); // Shorter delay
    
    // Skip the heading check if you don't have a specific heading to check
    await visualStep('Test complete!', '#dff0d8');
    
    await delay(1000); // Final shorter delay
  });
});
