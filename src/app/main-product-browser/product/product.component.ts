import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, finalize, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CartService } from 'src/app/cart/cart.service';
import { CommonService } from 'src/app/core/services/common.service';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { MainProductBrowserService } from '../main-product-browser.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  loadProduct$ = new BehaviorSubject(false);
  favIcon = 'favorite_border';
  likeLoading = false;
  isCommentLoaded = false;
  loadComment$ = new BehaviorSubject(false);
  productId = null;

  comments$ = this.loadComment$.pipe(
    filter(load=>load),
    withLatestFrom(this.route.queryParams),
    switchMap(([load,param])=>this.mainService.getComments(param.id)),
    tap((comments)=>{
      console.log('commentsasdfas', comments)
      this.loadComment$.next(false);
      
    })
    
  )
  
  product$ = this.loadProduct$.pipe(
    filter(load=>load),
    withLatestFrom(this.route.queryParams),
    switchMap(([load,param])=>this.mainService.getProducts(`productId=${param.id}`)),
    tap((product:any)=>{
      this.loadProduct$.next(false);
    }),
    withLatestFrom(this.route.queryParams),
    map(([products, param])=>{
      this.productId = param.id;
      if(products.length > 0){
        return products.filter((product:any)=>product.productId===param.id ).map((product:any)=>{
          product.price = Number(product.price).toFixed(2);
          if(!!product.likes){
            product.likes = [...new Set(product.likes.split(', '))];
            let userIdIndex = product.likes.findIndex((like:any)=>like === this.userService.currentUser$?.value?.id);
            if(userIdIndex > -1) {
              this.favIcon = 'favorite';
            } else {
              this.favIcon = 'favorite_border';
            }
          } else {
            product.likes = [];
          }
          
          return product;
        })[0];
      } else {
        return {};
      }
    }),
    tap((product)=>{
      this.soldToday$ = this.mainService.getSoldTodayCount(product.productId);
      this.loadComment$.next(true);
    })
  );

  soldToday$:any;

  quantity = new FormControl(1,[Validators.required,
    Validators.pattern("^[0-9]*$")]);
  constructor(
    private readonly mainService: MainProductBrowserService,
    private readonly route: ActivatedRoute,
    private readonly userService: UserLogService,
    private readonly cartService: CartService,
    private readonly commonService: CommonService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadProduct$.next(true);
    this.product$.subscribe((res)=>{
    })
  }
  addToCart(product:any){
    if(!this.userService.logged.value){
      this.router.navigate(['/log-in']);
      return
    }
    let data = {
      product_id: product.productId, 
      user_id: this.userService.currentUser$.value.id,
      quantity: this.quantity.value,
      is_selected: false
    };

    this.cartService.addToCart(data).pipe(
      finalize(()=>{
        this.commonService.showSuccess('Added To Cart Successfully');
      })
    ).subscribe();
  }

  like(product:any){
    if(!this.userService.logged.value){
      this.router.navigate(['/log-in']);
      return
    }
    this.likeLoading = true;
    if(this.favIcon === 'favorite_border'){
      this.favIcon = 'favorite'
      product.likes.push(this.userService.currentUser$.value.id);
    } else {
      this.favIcon = 'favorite_border'
      let userIdIndex = product.likes.findIndex((like:any)=>like === this.userService.currentUser$.value.id);
      product.likes.splice(userIdIndex,1);
    }
    const data = {
      product_id: product.productId,
      user_id: this.userService.currentUser$.value.id,
      like: this.favIcon === 'favorite'
    }
    this.mainService.like(data).pipe(
      tap(()=>{
        this.likeLoading = false;
        
      })
    ).subscribe();
  }

  addComment(message:any){
    let data = {
      message: message,
      user_id: this.userService.currentUser$.value.id,
      product_id: this.productId
    };

    this.mainService.addComment(data).pipe(
      tap(()=>{
        this.commonService.showSuccess('Comment Added');
        this.loadComment$.next(true);
      })
    ).subscribe();
  }

  removeComment(message:any){
    this.mainService.removeComment(message).pipe(
      tap(()=>{
        this.commonService.showSuccess('Comment Removed');
        this.loadComment$.next(true);
      })
    ).subscribe();
  }

  editComment(message:any){
    this.mainService.editComment(message).pipe(
      tap(()=>{
        this.commonService.showSuccess('Comment Changed');
        this.loadComment$.next(true);
      })
    ).subscribe();
  }
  

}
