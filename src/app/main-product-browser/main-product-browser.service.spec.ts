import { TestBed } from '@angular/core/testing';

import { MainProductBrowserService } from './main-product-browser.service';

describe('MainProductBrowserService', () => {
  let service: MainProductBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainProductBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
