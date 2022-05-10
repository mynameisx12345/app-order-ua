import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainProductBrowserService {
  apiUrl = environment.apiUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }

  getHotProducts():Observable<Object>{
    return this.http.get(`${this.apiUrl}/api/items/hotProducts`);
  }

  getProductCategories(): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/items/productCategories`).pipe(
      map((categories:any)=>{
        const categoriesFormatted: Category[] = [];
        categories.forEach((cat:any)=>{
          categoriesFormatted.push({
            id:cat.id,
            name: cat.category_name,
            img: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
            + cat.category_image),
          });
        });
        
        return categoriesFormatted;
      })
    );
  }

  getProducts(param:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/items/products?${param}`).pipe(
      map((hotProd:any)=>{
        let hotProdFormatted: Products[] =[];
  
        hotProd.forEach((hot:any)=>{
          hotProdFormatted.push({
            productId:hot.id, 
            name: hot.product_name, 
            img: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
              + hot.product_image),
            price: hot.cur_price_a
          });
        });
  
        return hotProdFormatted;
      }),
    )
  }
}

export interface Category{
  id: number,
  name?: string,
  img?: any
}


interface Products {
  productId: string,
  name?: string,
  img?: any,
  price?: string
}


