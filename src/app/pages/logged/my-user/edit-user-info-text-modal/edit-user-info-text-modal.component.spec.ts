import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserInfoTextModalComponent } from './edit-user-info-text-modal.component';

describe('EditUserInfoTextModalComponent', () => {
  let component: EditUserInfoTextModalComponent;
  let fixture: ComponentFixture<EditUserInfoTextModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserInfoTextModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserInfoTextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
