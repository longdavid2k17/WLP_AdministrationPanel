import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDisableFormComponent } from './account-disable-form.component';

describe('AccountDisableFormComponent', () => {
  let component: AccountDisableFormComponent;
  let fixture: ComponentFixture<AccountDisableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDisableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDisableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
