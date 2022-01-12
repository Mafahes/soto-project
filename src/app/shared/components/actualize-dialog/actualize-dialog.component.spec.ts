import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizeDialogComponent } from './actualize-dialog.component';

describe('ActualizeDialogComponent', () => {
  let component: ActualizeDialogComponent;
  let fixture: ComponentFixture<ActualizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
