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

  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['/home']);
  }

}
