import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralSelectorComponent } from './funeral-selector.component';

describe('FuneralSelectorComponent', () => {
  let component: FuneralSelectorComponent;
  let fixture: ComponentFixture<FuneralSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuneralSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuneralSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
