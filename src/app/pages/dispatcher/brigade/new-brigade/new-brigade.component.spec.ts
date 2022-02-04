import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBrigadeComponent } from './new-brigade.component';

describe('NewBrigadeComponent', () => {
  let component: NewBrigadeComponent;
  let fixture: ComponentFixture<NewBrigadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBrigadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBrigadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
