import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
