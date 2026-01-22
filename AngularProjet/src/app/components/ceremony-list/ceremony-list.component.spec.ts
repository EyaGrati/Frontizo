import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeremonyListComponent } from './ceremony-list.component';

describe('CeremonyListComponent', () => {
  let component: CeremonyListComponent;
  let fixture: ComponentFixture<CeremonyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeremonyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeremonyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
