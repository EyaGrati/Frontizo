import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCeremonyComponent } from './add-ceremony.component';

describe('AddCeremonyComponent', () => {
  let component: AddCeremonyComponent;
  let fixture: ComponentFixture<AddCeremonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCeremonyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCeremonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
