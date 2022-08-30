import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CartService } from 'src/app/cart/cart.service';
import { MainProductBrowserService } from 'src/app/main-product-browser/main-product-browser.service';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() set product(data:any){
    this._product = data;
    if(this._product){
      this.soldToday$ = this.mainService.getSoldTodayCount(this._product?.productId);
      if(!!this._product.likes){
        this._product.likes = [... new Set(this._product.likes.split(', '))];
        let userIdIndex = this._product.likes.find((like:any)=>like === this.userService.currentUser$?.value?.id);
        if(userIdIndex > -1){
          this.favIcon ='favorite';
        }
      } else {
        this._product.likes = [];
      }
     
    }
  }
  _product!: Products;
  isMobile = this.commonService.isMobile;
  soldToday$: any;
  favIcon ='favorite_border';
  likeLoading = false;
  constructor(
    private readonly userService: UserLogService,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly commonService: CommonService,
    private readonly mainService: MainProductBrowserService
  ) { }

  ngOnInit(): void {
    if(!!this._product.img === false){
      this._product.img = '../../../../../assets//images/default.jpg'
    }
  }

  addToCart(){
    if(!this.userService.logged.value){
      this.router.navigate(['/log-in']);
      return
    }

    let data = {
      product_id: this._product.productId, 
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

  openProduct(){
    this.router.navigate([`/product`],{queryParams: { id: this._product.productId}});
  }

  like(){
    if(!this.userService.logged.value){
      this.router.navigate(['/log-in']);
      return
    }
    this.likeLoading = true;
    if(this.favIcon === 'favorite_border'){
      this.favIcon = 'favorite'
      this._product.likes.push(this.userService.currentUser$.value.id);
    } else {
      this.favIcon = 'favorite_border'
      let userIdIndex = this._product.likes.findIndex((like:any)=>like === this.userService.currentUser$.value.id);
      this._product.likes.splice(userIdIndex,1);
    }
    const data = {
      product_id: this._product.productId,
      user_id: this.userService.currentUser$.value.id,
      like: this.favIcon === 'favorite'
    }
    this.mainService.like(data).pipe(
      tap(()=>{
        this.likeLoading = false;
        
      })
    ).subscribe();
  }

  

}

export interface Products {
  productId: string,
  name?: string,
  img?: any,
  price?: string,
  likes?: any
}