import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUsedRegisterComponent } from './vehicle-used-register.component';

describe('VehicleUsedRegisterComponent', () => {
  let component: VehicleUsedRegisterComponent;
  let fixture: ComponentFixture<VehicleUsedRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleUsedRegisterComponent]
    });
    fixture = TestBed.createComponent(VehicleUsedRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
