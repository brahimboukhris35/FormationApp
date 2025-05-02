import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableCentreSpaceComponent } from './responsable-centre-space.component';

describe('ResponsableCentreSpaceComponent', () => {
  let component: ResponsableCentreSpaceComponent;
  let fixture: ComponentFixture<ResponsableCentreSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsableCentreSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsableCentreSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
