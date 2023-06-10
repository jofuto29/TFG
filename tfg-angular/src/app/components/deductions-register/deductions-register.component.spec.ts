import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionsRegisterComponent } from './deductions-register.component';

describe('DeductionsRegisterComponent', () => {
  let component: DeductionsRegisterComponent;
  let fixture: ComponentFixture<DeductionsRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeductionsRegisterComponent]
    });
    fixture = TestBed.createComponent(DeductionsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
