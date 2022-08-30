import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  apiUrl = environment.apiUrl;
  constructor(
    private readonly http: HttpClient
  ) { }

  getOrders(param:string){
    let curDate = new Date();
    return this.http.get(`${this.apiUrl}/api/orders/getOrders?${param}`).pipe(
      map((orders:any)=>{
        return orders.map((order:any)=>{
          let timeDiff = curDate.getTime() - (new Date(order.dt_queued)).getTime();
          let days = Math.floor(timeDiff/(1000 * 60 * 60 * 24));
          let hours = Math.floor(timeDiff/(1000 * 60 * 60));
          let min = Math.floor(timeDiff/ (1000 * 60));
          if(days > 0){
            order.timeDiff = `${days} day${days > 1 ? 's': ''}`;
          } else if (hours > 0) {
            order.timeDiff = `${hours} hour${hours > 1 ? 's': ''}`;
          } else if (min > 0) {
            order.timeDiff = `${min} minute${min > 1 ? 's': ''}`;
          }

          let color = 'white';
          if(min < 30){
            color = 'white';
          } else if (min < 59){
            color = 'yellow';
          } else if (hours === 1){
            color = 'orange';
          } else if (hours > 1 || days > 0){
            color = 'red';
          }
          order.color = color;
          return order;
        })
      })
    )
  }

  saveProduct(data:any){
    return this.http.post(`${this.apiUrl}/api/items/saveProduct`,data);
  }

  saveCategory(data:any){
    return this.http.post(`${this.apiUrl}/api/items/saveCategory`, data);
  }

  saveHotProduct(data:any){
    return this.http.post(`${this.apiUrl}/api/items/addHotProduct`, data);
  }

  getUserAccounts(){
    return this.http.get(`${this.apiUrl}/api/users/getUserList`).pipe(
      map((users:any)=>{
        return users.map((user:any)=>{
          return {
            userId: user.id,
            firstname: user.first_name,
            middlename: user.middle_name,
            lastname: user.last_name,
            suffix: user.suffix,
            email: user.email,
            password: user.password,
            userType: user.user_type,
            isApproved: user.is_approved === '1'
          }
        })
      })
    )
  }

  addUser(data:any){
    return this.http.post(`${this.apiUrl}/api/users/addUser`, data);
  }

  updateUser(data:any){
    return this.http.post(`${this.apiUrl}/api/users/updateUser`, data);
  }

  getDailySalesReport(){
    return this.http.get(`${this.apiUrl}/api/reports/reportDailySales`);
  }

  removeCategory(id:any){
    return this.http.get(`${this.apiUrl}/api/items/removeCategory?catId=${id}`);
  }

  removeHot(id:any){
    return this.http.get(`${this.apiUrl}/api/items/removeHot?id=${id}`);
  }
}
