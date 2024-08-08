import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserInfoListModalComponent } from './edit-user-info-list-modal.component';

describe('EditUserInfoListModalComponent', () => {
  let component: EditUserInfoListModalComponent;
  let fixture: ComponentFixture<EditUserInfoListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserInfoListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserInfoListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
