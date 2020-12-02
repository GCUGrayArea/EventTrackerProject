import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarTabDisplayComponent } from './bar-tab-display.component';

describe('BarTabDisplayComponent', () => {
  let component: BarTabDisplayComponent;
  let fixture: ComponentFixture<BarTabDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarTabDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarTabDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
