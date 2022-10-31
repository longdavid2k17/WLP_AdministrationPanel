import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDiscoveryWidgetComponent } from './service-discovery-widget.component';

describe('ServiceDiscoveryWidgetComponent', () => {
  let component: ServiceDiscoveryWidgetComponent;
  let fixture: ComponentFixture<ServiceDiscoveryWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDiscoveryWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDiscoveryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
