import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  deviceInfo = this.deviceService.getDeviceInfo();
  isTablet = this.deviceService.isTablet();
  isMobile = this.deviceService.isMobile();
  isDesktop = this.deviceService.isDesktop();

  constructor(
    private deviceService: DeviceDetectorService,
    private readonly snackbar: MatSnackBar
  ) { }

  showError(message:string){
    this.snackbar.open(message,undefined, {verticalPosition: 'top',duration:3000,
        panelClass: ['mat-toolbar', 'mat-warn']});
  }

  showSuccess(message:string){
    this.snackbar.open(message,undefined, {verticalPosition: 'top',duration:3000,
        panelClass: ['mat-toolbar', 'mat-primary']});
  }
}
