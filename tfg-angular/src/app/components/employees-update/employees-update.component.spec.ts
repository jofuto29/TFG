import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesUpdateComponent } from './employees-update.component';

describe('EmployeesUpdateComponent', () => {
  let component: EmployeesUpdateComponent;
  let fixture: ComponentFixture<EmployeesUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesUpdateComponent]
    });
    fixture = TestBed.createComponent(EmployeesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
