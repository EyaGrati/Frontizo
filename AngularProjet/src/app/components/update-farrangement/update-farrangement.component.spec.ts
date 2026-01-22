import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFarrangementComponent } from './update-farrangement.component';

describe('UpdateFarrangementComponent', () => {
  let component: UpdateFarrangementComponent;
  let fixture: ComponentFixture<UpdateFarrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFarrangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFarrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
