import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRegisterComponent } from './invoice-register.component';

describe('InvoiceRegisterComponent', () => {
  let component: InvoiceRegisterComponent;
  let fixture: ComponentFixture<InvoiceRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceRegisterComponent]
    });
    fixture = TestBed.createComponent(InvoiceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
