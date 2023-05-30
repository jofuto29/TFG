import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocenosComponent } from './conocenos.component';

describe('ConocenosComponent', () => {
  let component: ConocenosComponent;
  let fixture: ComponentFixture<ConocenosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConocenosComponent]
    });
    fixture = TestBed.createComponent(ConocenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
