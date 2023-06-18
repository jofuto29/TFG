import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsUpdateComponent } from './payment-methods-update.component';

describe('PaymentMethodsUpdateComponent', () => {
  let component: PaymentMethodsUpdateComponent;
  let fixture: ComponentFixture<PaymentMethodsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodsUpdateComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
