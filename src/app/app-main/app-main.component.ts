import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {

  deviceInfo:any;
  isTablet = false;
  isMobile = false;
  isDesktop = false;

  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isTablet = this.deviceService.isTablet();
    this.isMobile = this.deviceService.isMobile();
    this.isDesktop = this.deviceService.isDesktop();
    console.log('12345', this.deviceInfo, this.isTablet, this.isMobile, this.isDesktop);
    this.router.navigate(['/home']);
  }

}
