import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CacheService } from '../core/services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {
  apiUrl = environment.apiUrl;
  currentUser$ = new BehaviorSubject<any>(null);
  logged = new BehaviorSubject(false);
  constructor(
    private http: HttpClient,
    private readonly sanitizer: DomSanitizer,
    private cacheService: CacheService
  ) { }

  login(data:any){
    let returnObs: any;
    if(this.cacheService.loadLocal('userInfo')){
      returnObs =  of(this.cacheService.loadLocal('userInfo'));
    } else {
      returnObs = this.http.post(`${this.apiUrl}/api/users/login`,data).pipe(
        tap((userInfo:any)=>{
          this.cacheService.saveLocal({
            key: 'userInfo',
            content: userInfo
          })
        })
      );
    }

    return returnObs.pipe(
      tap((userInfo:any)=>{
        this.currentUser$.next(userInfo[0]);
        this.logged.next(true);
      })
    )
   
  }

  logout(){
    this.cacheService.removeLocal('userInfo');
    this.currentUser$.next(null);
    this.logged.next(false);
    
  }

  getOdersDetailed(userId:any):any{
    return this.http.get(`${this.apiUrl}/api/orders/getOrdersDetailed?userId=${userId}`).pipe(
      map((orders:any)=>{
        console.log('ordersfresh', orders)
        orders.forEach((order:any)=>{
          order.productFilters = '';
          order.products.forEach((product:any)=>{
            
            order.productFilters = `${order.productFilters}${product.product_name}`;
            product.product_image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
            + product.product_image)
          });
          switch(order.status){
            case 'Q':
              order.status = 'On Queue';
              break;
            case 'C':
              order.status = 'On Hold';
              break;
            case 'P':
              order.status = 'Paid';
              break;
            case 'S':
              order.status = 'Serving';
              break;
            case 'X': 
              order.status = 'Cancelled';
              break;
          }
        });
        console.log('ordresffff', orders);
        
        return orders;
      })
    );
  }

  updateOrderStatus(data:{}){
    return this.http.post(`${this.apiUrl}/api/orders/updateOrderStatus`,data);
  }
}

export interface UserModel{
  id: number,
  email: string,

}
