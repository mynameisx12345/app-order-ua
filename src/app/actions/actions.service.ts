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
    return this.http.get(`${this.apiUrl}/api/orders/getOrders?${param}`)
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
            userType: user.user_type
          }
        })
      })
    )
  }

  addUser(data:any){
    return this.http.post(`${this.apiUrl}/api/users/addUser`, data);
  }
}
