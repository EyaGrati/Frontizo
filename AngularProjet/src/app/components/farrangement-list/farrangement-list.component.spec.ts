import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarrangementListComponent } from './farrangement-list.component';

describe('FarrangementListComponent', () => {
  let component: FarrangementListComponent;
  let fixture: ComponentFixture<FarrangementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarrangementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarrangementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
