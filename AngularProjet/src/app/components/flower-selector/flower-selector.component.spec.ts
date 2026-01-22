import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerSelectorComponent } from './flower-selector.component';

describe('FlowerSelectorComponent', () => {
  let component: FlowerSelectorComponent;
  let fixture: ComponentFixture<FlowerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
