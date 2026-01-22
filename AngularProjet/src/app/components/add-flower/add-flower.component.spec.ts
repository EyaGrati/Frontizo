import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlowerComponent } from './add-flower.component';

describe('AddFlowerComponent', () => {
  let component: AddFlowerComponent;
  let fixture: ComponentFixture<AddFlowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
