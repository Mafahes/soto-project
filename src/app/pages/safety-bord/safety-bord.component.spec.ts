import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyBordComponent } from './safety-bord.component';

describe('SafetyBordComponent', () => {
  let component: SafetyBordComponent;
  let fixture: ComponentFixture<SafetyBordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyBordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
