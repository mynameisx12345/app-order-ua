import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrScanResultComponent } from './qr-scan-result.component';

describe('QrScanResultComponent', () => {
  let component: QrScanResultComponent;
  let fixture: ComponentFixture<QrScanResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrScanResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrScanResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
