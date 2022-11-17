import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingManagementComponent } from './mailing-management.component';

describe('MailingManagementComponent', () => {
  let component: MailingManagementComponent;
  let fixture: ComponentFixture<MailingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
