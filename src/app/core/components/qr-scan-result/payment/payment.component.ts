import { Component, Input, OnInit, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/common.service';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  @ViewChild('confirmBox') confirmBox: any;
  @ViewChild('details') details:any;
  @Input() set qrValue(data:any){
    if(!!data){
      this._qrValue = data;
      this.loadOrderDetails$.next(true);
    }
    
  };
  @Input() action = '';
  @Output() changeStatus = new EventEmitter();
  @Input() serveStatus = false;
  _qrValue = '';
  orderDetails: any;

  loadOrderDetails$ = new BehaviorSubject(false);
  currentDialog: any;
  isMobile = this.commonService.isMobile;
  qrUrl = environment.qrUrl;
  constructor(
    private readonly userService: UserLogService,
    private readonly dialog: MatDialog,
    private readonly commonService: CommonService
  ) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    this.loadOrderDetails$.pipe(
      filter(load=>load),
      switchMap(()=>this.userService.getOdersDetailed(`orderId=${this._qrValue}`)),
      tap((orders:any)=>{
        this.orderDetails = orders[0];
        this.loadOrderDetails$.next(false);
      })
    ).subscribe();

  }

  getProductTotal(product:any){
    return (Number(product.price) * Number(product.quantity)).toFixed(2);
  }

  openDetails(){
    this.currentDialog = this.dialog.open(this.details,{
      disableClose: true,
      width: this.isMobile ? '80%' : '30%',
    })
  }

  confirmPayment(){
    this.currentDialog = this.dialog.open(this.confirmBox,{
      disableClose: true,
      width: this.isMobile ? '80%' : '30%',
    })
  }

  pay(){
    this.changeStatus.emit({id:this.qrValue, status: this.action, isForced: false});
    this.currentDialog.close();
  }

  payQr(){
    window.open(`${this.qrUrl}?action=P`,'_self');
  }

}
