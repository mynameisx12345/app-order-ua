import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = environment.apiUrl;
  cart$ = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }

  addToCart(data:any){
    return this.http.post(`${this.apiUrl}/api/items/addToCart`, data).pipe(
      finalize(()=>{
        let cartValue: any = this.cart$.value
        let check = cartValue.filter((cart:any)=> cart.product_id === data.product_id 
          && cart.user_id === data.user_id ).length;

        if(check===0){
          cartValue.push(data);
          this.cart$.next(cartValue);
        }
      })
    );
  }

  retrieveCart(userId:any){
    return this.http.get(`${this.apiUrl}/api/items/retrieveCart?userId=${userId}`).pipe(
      map((cart:any)=>{
        cart.forEach((car:any)=>{
          car.price = car.cur_price_a;
          car.product_image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
            + car.product_image)
        });

        return cart;
      }),
      tap((cart:any)=>{
        console.log('cartest', cart)
        this.cart$.next(cart);
      })
    );
  }

  saveOrder(data:any){
    return this.http.post(`${this.apiUrl}/api/items/saveOrder`,data);
  }
}
