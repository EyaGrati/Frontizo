import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSelectorComponent } from './meal-selector.component';

describe('MealSelectorComponent', () => {
  let component: MealSelectorComponent;
  let fixture: ComponentFixture<MealSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
