import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesFormComponent } from './parties-form.component';

describe('PartiesFormComponent', () => {
  let component: PartiesFormComponent;
  let fixture: ComponentFixture<PartiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
