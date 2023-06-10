import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSeeComponent } from './invoice-see.component';

describe('InvoiceSeeComponent', () => {
  let component: InvoiceSeeComponent;
  let fixture: ComponentFixture<InvoiceSeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceSeeComponent]
    });
    fixture = TestBed.createComponent(InvoiceSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
