import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFuneralLocationComponent } from './update-funeral-location.component';

describe('UpdateFuneralLocationComponent', () => {
  let component: UpdateFuneralLocationComponent;
  let fixture: ComponentFixture<UpdateFuneralLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFuneralLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFuneralLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
