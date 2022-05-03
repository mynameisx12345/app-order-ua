import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-main-product-browser',
  templateUrl: './main-product-browser.component.html',
  styleUrls: ['./main-product-browser.component.scss']
})
export class MainProductBrowserComponent implements OnInit {
  deviceInfo:any;
  isTablet = false;
  isMobile = false;
  isDesktop = false;

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isTablet = this.deviceService.isTablet();
    this.isMobile = this.deviceService.isMobile();
    this.isDesktop = this.deviceService.isDesktop();
    console.log('12345', this.deviceInfo, this.isTablet, this.isMobile, this.isDesktop);
  }

}
