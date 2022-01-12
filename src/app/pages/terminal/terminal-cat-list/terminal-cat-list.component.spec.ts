import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCatListComponent } from './terminal-cat-list.component';

describe('TerminalCatListComponent', () => {
  let component: TerminalCatListComponent;
  let fixture: ComponentFixture<TerminalCatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalCatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
