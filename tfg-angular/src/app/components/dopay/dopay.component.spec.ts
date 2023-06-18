import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DopayComponent } from './dopay.component';

describe('DopayComponent', () => {
  let component: DopayComponent;
  let fixture: ComponentFixture<DopayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DopayComponent]
    });
    fixture = TestBed.createComponent(DopayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
