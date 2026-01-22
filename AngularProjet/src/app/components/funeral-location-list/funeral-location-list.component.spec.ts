import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralLocationListComponent } from './funeral-location-list.component';

describe('FuneralLocationListComponent', () => {
  let component: FuneralLocationListComponent;
  let fixture: ComponentFixture<FuneralLocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralLocationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
