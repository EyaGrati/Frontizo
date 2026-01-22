import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCeremonyComponent } from './update-ceremony.component';

describe('UpdateCeremonyComponent', () => {
  let component: UpdateCeremonyComponent;
  let fixture: ComponentFixture<UpdateCeremonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCeremonyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCeremonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
