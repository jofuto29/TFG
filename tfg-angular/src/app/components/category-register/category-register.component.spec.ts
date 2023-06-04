import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRegisterComponent } from './category-register.component';

describe('CategoryRegisterComponent', () => {
  let component: CategoryRegisterComponent;
  let fixture: ComponentFixture<CategoryRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryRegisterComponent]
    });
    fixture = TestBed.createComponent(CategoryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
