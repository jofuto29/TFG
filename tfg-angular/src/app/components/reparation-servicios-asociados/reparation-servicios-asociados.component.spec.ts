import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationServiciosAsociadosComponent } from './reparation-servicios-asociados.component';

describe('ReparationServiciosAsociadosComponent', () => {
  let component: ReparationServiciosAsociadosComponent;
  let fixture: ComponentFixture<ReparationServiciosAsociadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReparationServiciosAsociadosComponent]
    });
    fixture = TestBed.createComponent(ReparationServiciosAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
