import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/cart/cart.service';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { QueueComponent } from './../../actions/queue/queue.component';
//import {QrScannerComponent} from 'angular2-qrscanner';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrScannerComponent } from './../../core/components/qr-scanner/qr-scanner.component'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, AfterViewInit {
  logged$ = this.userService.logged;
  currentUser:any;
  cart$ = this.shoppingCart.cart$;
  currentDialog:any;
  @ViewChild('scannerCont') scannerCont:any;
  @ViewChild('scanner') scanner: any;
  //@ViewChild(QrScannerComponent, { static: true }) qrScannerComponent:any;
  qrUrl = environment.qrUrl;
  constructor(
    private readonly router:Router,
    private readonly userService: UserLogService,
    private readonly shoppingCart: CartService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(res=>{
      this.currentUser = res;
    });

    this.userService.currentUser$.pipe(
      filter(user=>user !==null),
      switchMap((user:any)=>{
        return this.shoppingCart.retrieveCart(user.id);
      })
    ).subscribe();

  }

   ngAfterViewInit(): void {
     //.qrLoad();
   }

  login(){
    this.router.navigate(['/log-in']);
  }

  viewCart(){
    if(!this.userService.logged.value){
      this.router.navigate(['/log-in']);
      return;
    }
    this.router.navigate(['/shopping-cart']);
  }

  emptyCart(cart:any){
    return cart.length === 0
  }

  openQueue(){
    this.currentDialog = this.dialog.open(QueueComponent,{
      width:'95%',
      height: '95%'
    })
  }

  goToOrders(){
    this.router.navigate(['/my-orders']);
  }

  openScanner(){
    this.currentDialog = this.dialog.open(QrScannerComponent,{});
  }
  
  jumpToQrCode(){
    window.open(`${this.qrUrl}?action=S`,'_self');
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/home']);
    this.shoppingCart.cart$.next([]);
  }

  // qrLoad(){
  //   this.qrScannerComponent.getMediaDevices().then((devices:any) => {
  //     console.log('testdevice',devices);
  //     const videoDevices: MediaDeviceInfo[] = [];
  //     for (const device of devices) {
  //         if (device.kind.toString() === 'videoinput') {
  //             videoDevices.push(device);
  //         }
  //     }
  //     if (videoDevices.length > 0){
  //         let choosenDev;
  //         for (const dev of videoDevices){
  //             if (dev.label.includes('front')){
  //                 choosenDev = dev;
  //                 break;
  //             }
  //         }
  //         if (choosenDev) {
  //             this.qrScannerComponent.chooseCamera.next(choosenDev);
  //         } else {
  //             this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
  //         }
  //     }
  //   });

  //   this.qrScannerComponent.capturedQr.subscribe((result:any) => {
  //       console.log('qrrrr',result);
  //   });
  //}

}
