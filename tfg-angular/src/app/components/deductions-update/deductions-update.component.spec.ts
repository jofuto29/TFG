import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionsUpdateComponent } from './deductions-update.component';

describe('DeductionsUpdateComponent', () => {
  let component: DeductionsUpdateComponent;
  let fixture: ComponentFixture<DeductionsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeductionsUpdateComponent]
    });
    fixture = TestBed.createComponent(DeductionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
