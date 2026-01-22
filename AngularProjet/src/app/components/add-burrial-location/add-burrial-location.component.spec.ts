import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBurrialLocationComponent } from './add-burrial-location.component';

describe('AddBurrialLocationComponent', () => {
  let component: AddBurrialLocationComponent;
  let fixture: ComponentFixture<AddBurrialLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBurrialLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBurrialLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
