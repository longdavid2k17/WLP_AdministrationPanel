import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementPreviewComponent } from './user-management-preview.component';

describe('UserManagementPreviewComponent', () => {
  let component: UserManagementPreviewComponent;
  let fixture: ComponentFixture<UserManagementPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
