import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationProductosAsociadosComponent } from './reparation-productos-asociados.component';

describe('ReparationProductosAsociadosComponent', () => {
  let component: ReparationProductosAsociadosComponent;
  let fixture: ComponentFixture<ReparationProductosAsociadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReparationProductosAsociadosComponent]
    });
    fixture = TestBed.createComponent(ReparationProductosAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
