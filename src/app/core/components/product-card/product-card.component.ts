import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CartService } from 'src/app/cart/cart.service';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Products;
  isMobile = this.commonService.isMobile;
  constructor(
    private readonly userService: UserLogService,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly commonService: CommonService
  ) { }

  ngOnInit(): void {
    if(!!this.product.img === false){
      this.product.img = '../../../../../assets//images/default.jpg'
    }
  }

  addToCart(){
    if(!this.userService.logged.value){
      this.router.navigate(['/log-in']);
      return
    }

    let data = {
      product_id: this.product.productId, 
      user_id: this.userService.currentUser$.value.id,
      quantity: 1,
      is_selected: false
    };

    this.cartService.addToCart(data).pipe(
      // catchError(error=>{
      //   this.commonService.showError(error.error);
      //   return throwError(error);
      // }),
      finalize(()=>{
        this.commonService.showSuccess('Added To Cart Successfully');
      })
    ).subscribe();
  }

}

export interface Products {
  productId: string,
  name?: string,
  img?: any,
  price?: string
}