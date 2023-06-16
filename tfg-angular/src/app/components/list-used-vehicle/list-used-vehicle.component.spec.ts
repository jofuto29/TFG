import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsedVehicleComponent } from './list-used-vehicle.component';

describe('ListUsedVehicleComponent', () => {
  let component: ListUsedVehicleComponent;
  let fixture: ComponentFixture<ListUsedVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsedVehicleComponent]
    });
    fixture = TestBed.createComponent(ListUsedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
