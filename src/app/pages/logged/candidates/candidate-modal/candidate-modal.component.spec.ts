import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateModalComponent } from './candidate-modal.component';

describe('CandidateModalComponent', () => {
  let component: CandidateModalComponent;
  let fixture: ComponentFixture<CandidateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
