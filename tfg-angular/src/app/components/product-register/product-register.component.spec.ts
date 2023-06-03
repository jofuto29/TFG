import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegisterComponent } from './product-register.component';

describe('ProductRegisterComponent', () => {
  let component: ProductRegisterComponent;
  let fixture: ComponentFixture<ProductRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRegisterComponent]
    });
    fixture = TestBed.createComponent(ProductRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
