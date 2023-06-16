import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleClientComponent } from './vehicle-client.component';

describe('VehicleClientComponent', () => {
  let component: VehicleClientComponent;
  let fixture: ComponentFixture<VehicleClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleClientComponent]
    });
    fixture = TestBed.createComponent(VehicleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
