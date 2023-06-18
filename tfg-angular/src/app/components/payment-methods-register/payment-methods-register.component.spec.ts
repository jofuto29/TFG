import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsRegisterComponent } from './payment-methods-register.component';

describe('PaymentMethodsRegisterComponent', () => {
  let component: PaymentMethodsRegisterComponent;
  let fixture: ComponentFixture<PaymentMethodsRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodsRegisterComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
