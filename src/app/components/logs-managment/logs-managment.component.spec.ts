import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsManagmentComponent } from './logs-managment.component';

describe('LogsManagmentComponent', () => {
  let component: LogsManagmentComponent;
  let fixture: ComponentFixture<LogsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
