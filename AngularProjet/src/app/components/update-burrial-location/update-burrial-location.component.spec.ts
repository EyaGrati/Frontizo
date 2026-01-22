import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBurrialLocationComponent } from './update-burrial-location.component';

describe('UpdateBurrialLocationComponent', () => {
  let component: UpdateBurrialLocationComponent;
  let fixture: ComponentFixture<UpdateBurrialLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBurrialLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBurrialLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
