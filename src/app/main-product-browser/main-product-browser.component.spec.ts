import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductBrowserComponent } from './main-product-browser.component';


describe('MainProductBrowserComponent', () => {
  let component: MainProductBrowserComponent;
  let fixture: ComponentFixture<MainProductBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProductBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProductBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
