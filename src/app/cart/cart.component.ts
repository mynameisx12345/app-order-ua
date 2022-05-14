import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { UserLogService } from '../user-log/user-log.service';
import { CartService } from './cart.service';
import {SelectionModel} from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NullTemplateVisitor } from '@angular/compiler';
import { CommonService } from '../core/services/common.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('confirmBox') confirmBox:any;
  selection = new SelectionModel<any>(true, []);
  orders = [ 
    {id: 1, product_id: 1, product_name:'Item Name', product_image: '', price:'100.00', quantity:1},
    {id: 1, product_id: 1, product_name:'ItemName', product_image: '', price:'100.00', quantity:1},
    {id: 1, product_id: 1, product_name:'Item Name', product_image: '', price:'100.00', quantity:1}
  ];


  displayedColumns = ['select','product_image','product_name','price','quantity'];

  dataSource:any;
  cart$ = this.userService.currentUser$.pipe(
    filter(user=>user!==null),
    switchMap(user=>this.shoppingCart.retrieveCart(user.id))
  )

  currentDialog:any;
  dialogSize = this.commonService.isMobile ? '90%' : '30%';
  loading = false;
  constructor(
    private readonly shoppingCart: CartService,
    private readonly userService: UserLogService,
    private readonly dialog: MatDialog,
    private readonly commonService: CommonService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.cart$.subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
    })
    
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getSelected(){
    console.log('selection', this.selection);
  }

  get noOfSelected(){
    return this.selection.selected.length || 0;
  }

  get selectedPrice(){
    let selected = this.selection.selected;
    let price = 0;
    if(selected.length > 0){
      
      selected.forEach((sel:any)=>{
        price += sel.price * sel.quantity;
      });
    }

    return (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  confirmCheckout(){
    this.currentDialog = this.dialog.open(this.confirmBox,{
      disableClose: true,
      width: this.dialogSize
    })
  }

  saveOrder(status:string){
    this.loading= true;
    let data = {
      id: null,
      user_id : this.userService.currentUser$.value.id,
      sub_total: this.selectedPrice,
      discount: 0,
      total: this.selectedPrice,
      status: status,
      dt_checkout: null,
      dt_queued: null,
      dt_served: null,
      dt_paid: null,
      dt_cancelled: null,
      dtl: this.dataSource.data.map((dt:any)=> {
        return {quantity: dt.quantity, product_id: dt.product_id, price: dt.price }
      }),
    };
    this.shoppingCart.saveOrder(data).pipe(
      catchError(error=>{
        this.commonService.showError(error.error);
        return throwError(error);
      }),
      tap(res=>{ 
        let message = '';
        switch(status){
          case 'C':
            message = 'Your order is placed but held';
            break;
          case 'Q':
            message = 'Your order is placed successfully. Now please wait for the queue. See On-queue orders to track';
            break;
        }
        
        this.commonService.showSuccess(message);
        this.currentDialog.close();

        this.shoppingCart.cart$.next([]);
        this.dataSource.data = [];
        this.selection = new SelectionModel<any>(true, []);
        this.router.navigate(['/my-orders'])
      }),
      finalize(()=>{
        this.loading = false;
      })
    ).subscribe();
    
  }

}
