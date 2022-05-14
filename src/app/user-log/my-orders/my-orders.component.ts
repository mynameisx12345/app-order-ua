import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { delay, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/common.service';
import { UserLogService } from '../user-log.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: any;

  loadOrders$ = new BehaviorSubject(false);
  displayedColumns = ['menu','status','id','sub_total','discount','total','products'];
  dataSource = new MatTableDataSource;
  orders$:any = this.loadOrders$.pipe(
    filter(load=>load),
    withLatestFrom(this.userService.currentUser$),
    switchMap(([load, user])=>this.userService.getOdersDetailed(user.id)),
    tap((orders:any)=>{
      this.dataSource.data = orders;
      console.log('sssdfe', orders);
    })
  );

  isMobile = this.commonService.isMobile;
  currentDialog: any;
  @ViewChild('qrWindow') qrWindow: any;
  qrData:any;
  @ViewChild('confirmBox') confirmBox: any;
  selectedOrderId = '';

  constructor(
    private readonly userService: UserLogService,
    private readonly commonService: CommonService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadOrders$.next(true);
    this.orders$.subscribe();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewQr(data:any){
    this.qrData = JSON.parse(JSON.stringify(data));
    console.log('qrData', this.qrData);
    this.currentDialog = this.dialog.open(this.qrWindow,{
      
    });

    const qrInterval = setInterval(()=>{
      this.loadOrders$.next(true);
      let loadedData:any = this.dataSource.data.find((ds:any)=>ds.id === this.qrData.id);
      
      if(loadedData.status !== this.qrData.status){
        this.currentDialog.close();
      }
    }, 5000);

    this.currentDialog.afterClosed().subscribe((res:any)=>{
      clearInterval(qrInterval);
    })
  }

  cancelOrder(orderId:any){
    this.selectedOrderId = orderId;
    this.currentDialog = this.dialog.open(this.confirmBox,{
      width:'30%',
      disableClose: true
    })
  }

  cancel(){
    this.userService.updateOrderStatus({id:this.selectedOrderId, status:'X'}).subscribe();
  }


}
