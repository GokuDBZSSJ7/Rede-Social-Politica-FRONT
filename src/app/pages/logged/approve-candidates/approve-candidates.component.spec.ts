import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCandidatesComponent } from './approve-candidates.component';

describe('ApproveCandidatesComponent', () => {
  let component: ApproveCandidatesComponent;
  let fixture: ComponentFixture<ApproveCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveCandidatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
