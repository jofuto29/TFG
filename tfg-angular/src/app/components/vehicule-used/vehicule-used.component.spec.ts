import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeUsedComponent } from './vehicule-used.component';

describe('VehiculeUsedComponent', () => {
  let component: VehiculeUsedComponent;
  let fixture: ComponentFixture<VehiculeUsedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculeUsedComponent]
    });
    fixture = TestBed.createComponent(VehiculeUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
