import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-qr-scan-result',
  templateUrl: './qr-scan-result.component.html',
  styleUrls: ['./qr-scan-result.component.scss']
})
export class QrScanResultComponent implements OnInit, AfterViewInit {
  qrValue = '';
  action = '';
  actionMessage = '';
  qrUrl = environment.qrUrl;
  serveStatus:any = null;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserLogService,
    private readonly commonSevice: CommonService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      if(params.hasOwnProperty('qrValue')){
        this.qrValue = params.qrValue;
        this.action = params.action;
        switch(this.action){
          case 'S':
            this.actionMessage = 'Served';
            break;
        }
        this.updateNow(false);
      }
      
    })
  }

  updateNow(isForced:boolean){
    this.userService.updateOrderStatus({id:this.qrValue, status: this.action, isForced: isForced}).pipe(
      catchError((error)=>{
        this.serveStatus = false;
        return throwError(error);
      }),
      tap((res)=>{
        this.serveStatus = true;
      }),
      finalize(()=>{
        this.router.navigate(['/qr-result']);
      })
    )
    .subscribe((res:any)=>{
      this.commonSevice.showSuccess(`Order: ${this.qrValue} is ${this.actionMessage}`);
      
    });
  }

  jumpToQrCode(){
    window.open(`${this.qrUrl}?action=S`,'_self');
  }

  forceServe(){
    this.updateNow(true);
  }
  

}
