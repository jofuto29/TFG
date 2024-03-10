import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRegisterComponent } from './service-register.component';

describe('ServiceRegisterComponent', () => {
  let component: ServiceRegisterComponent;
  let fixture: ComponentFixture<ServiceRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRegisterComponent]
    });
    fixture = TestBed.createComponent(ServiceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
