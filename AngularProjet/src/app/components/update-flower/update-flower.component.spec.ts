import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlowerComponent } from './update-flower.component';

describe('UpdateFlowerComponent', () => {
  let component: UpdateFlowerComponent;
  let fixture: ComponentFixture<UpdateFlowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFlowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
