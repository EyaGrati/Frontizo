import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuneralLocationComponent } from './add-funeral-location.component';

describe('AddFuneralLocationComponent', () => {
  let component: AddFuneralLocationComponent;
  let fixture: ComponentFixture<AddFuneralLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFuneralLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFuneralLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
