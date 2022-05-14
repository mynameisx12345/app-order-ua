import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {
  isMobile = this.deviceService.isMobile();;
  currentUrl = '';

  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    //this.router.navigate(['/home']);
    this.currentUrl = window.location.href;
  }

  get isQrUrl(){
    return this.currentUrl.indexOf('qr-scan') > -1;
  }

}
