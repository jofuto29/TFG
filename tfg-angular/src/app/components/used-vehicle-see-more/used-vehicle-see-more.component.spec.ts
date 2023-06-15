import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedVehicleSeeMoreComponent } from './used-vehicle-see-more.component';

describe('UsedVehicleSeeMoreComponent', () => {
  let component: UsedVehicleSeeMoreComponent;
  let fixture: ComponentFixture<UsedVehicleSeeMoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsedVehicleSeeMoreComponent]
    });
    fixture = TestBed.createComponent(UsedVehicleSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
