import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurrialLocationListComponent } from './burrial-location-list.component';

describe('BurrialLocationListComponent', () => {
  let component: BurrialLocationListComponent;
  let fixture: ComponentFixture<BurrialLocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurrialLocationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurrialLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
