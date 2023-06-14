import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUsedAdminComponent } from './vehicle-used-admin.component';

describe('VehicleUsedAdminComponent', () => {
  let component: VehicleUsedAdminComponent;
  let fixture: ComponentFixture<VehicleUsedAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleUsedAdminComponent]
    });
    fixture = TestBed.createComponent(VehicleUsedAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
