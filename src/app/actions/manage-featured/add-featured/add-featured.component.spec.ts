import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeaturedComponent } from './add-featured.component';

describe('AddFeaturedComponent', () => {
  let component: AddFeaturedComponent;
  let fixture: ComponentFixture<AddFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeaturedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
