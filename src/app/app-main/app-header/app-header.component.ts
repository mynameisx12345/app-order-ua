import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/cart/cart.service';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { QueueComponent } from './../../actions/queue/queue.component';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  logged$ = this.userService.logged;
  currentUser:any;
  cart$ = this.shoppingCart.cart$;
  currentDialog:any;

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
      disableClose: true,
      width:'95%',
      height: '95%'
    })
  }

}
