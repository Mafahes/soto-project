import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigadeComponent } from './brigade.component';

describe('BrigadeComponent', () => {
  let component: BrigadeComponent;
  let fixture: ComponentFixture<BrigadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrigadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrigadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
