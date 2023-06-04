import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegiterComponent } from './supplier-regiter.component';

describe('SupplierRegiterComponent', () => {
  let component: SupplierRegiterComponent;
  let fixture: ComponentFixture<SupplierRegiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierRegiterComponent]
    });
    fixture = TestBed.createComponent(SupplierRegiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
