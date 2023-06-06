import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationRegisterComponent } from './reparation-register.component';

describe('ReparationRegisterComponent', () => {
  let component: ReparationRegisterComponent;
  let fixture: ComponentFixture<ReparationRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReparationRegisterComponent]
    });
    fixture = TestBed.createComponent(ReparationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
