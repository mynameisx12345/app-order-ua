import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter, switchMap } from 'rxjs/operators';
import { UserLogService } from '../user-log/user-log.service';
import { CartService } from './cart.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  orders = [
    {id: 1, product_id: 1, product_name:'Item Name', product_image: '', price:'100.00', quantity:1},
    {id: 1, product_id: 1, product_name:'Item Name', product_image: '', price:'100.00', quantity:1},
    {id: 1, product_id: 1, product_name:'Item Name', product_image: '', price:'100.00', quantity:1}
  ];


  displayedColumns = ['select','product_image','product_name','price','quantity'];

  dataSource:any;
  cart$ = this.userService.currentUser$.pipe(
    filter(user=>user!==null),
    switchMap(user=>this.shoppingCart.retrieveCart(user.id))
  )
  constructor(
    private readonly shoppingCart: CartService,
    private readonly userService: UserLogService
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

}
