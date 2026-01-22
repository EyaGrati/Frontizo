import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurrialSelectorComponent } from './burrial-selector.component';

describe('BurrialSelectorComponent', () => {
  let component: BurrialSelectorComponent;
  let fixture: ComponentFixture<BurrialSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurrialSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurrialSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
