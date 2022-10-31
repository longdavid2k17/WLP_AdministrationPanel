import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDiscoveryComponent } from './service-discovery.component';

describe('ServiceDiscoveryComponent', () => {
  let component: ServiceDiscoveryComponent;
  let fixture: ComponentFixture<ServiceDiscoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDiscoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
