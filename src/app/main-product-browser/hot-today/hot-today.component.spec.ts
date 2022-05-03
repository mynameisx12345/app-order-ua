import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotTodayComponent } from './hot-today.component';

describe('HotTodayComponent', () => {
  let component: HotTodayComponent;
  let fixture: ComponentFixture<HotTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
