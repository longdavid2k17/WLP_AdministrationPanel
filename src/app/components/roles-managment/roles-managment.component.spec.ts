import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesManagmentComponent } from './roles-managment.component';

describe('RolesManagmentComponent', () => {
  let component: RolesManagmentComponent;
  let fixture: ComponentFixture<RolesManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
