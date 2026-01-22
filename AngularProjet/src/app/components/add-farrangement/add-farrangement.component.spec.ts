import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFArrangementComponent } from './add-farrangement.component';

describe('AddFArrangementComponent', () => {
  let component: AddFArrangementComponent;
  let fixture: ComponentFixture<AddFArrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFArrangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
