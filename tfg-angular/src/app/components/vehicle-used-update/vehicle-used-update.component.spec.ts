import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUsedUpdateComponent } from './vehicle-used-update.component';

describe('VehicleUsedUpdateComponent', () => {
  let component: VehicleUsedUpdateComponent;
  let fixture: ComponentFixture<VehicleUsedUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleUsedUpdateComponent]
    });
    fixture = TestBed.createComponent(VehicleUsedUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
