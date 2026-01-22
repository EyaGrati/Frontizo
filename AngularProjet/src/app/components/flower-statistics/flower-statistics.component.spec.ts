import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerStatisticsComponent } from './flower-statistics.component';

describe('FlowerStatisticsComponent', () => {
  let component: FlowerStatisticsComponent;
  let fixture: ComponentFixture<FlowerStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
