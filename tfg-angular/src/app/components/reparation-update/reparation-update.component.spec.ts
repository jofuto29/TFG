import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationUpdateComponent } from './reparation-update.component';

describe('ReparationUpdateComponent', () => {
  let component: ReparationUpdateComponent;
  let fixture: ComponentFixture<ReparationUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReparationUpdateComponent]
    });
    fixture = TestBed.createComponent(ReparationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
