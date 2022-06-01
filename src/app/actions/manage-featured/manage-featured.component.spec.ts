import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeaturedComponent } from './manage-featured.component';

describe('ManageFeaturedComponent', () => {
  let component: ManageFeaturedComponent;
  let fixture: ComponentFixture<ManageFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFeaturedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
