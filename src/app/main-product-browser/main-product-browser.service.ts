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
            img: cat.category_image ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
            + cat.category_image) : cat.category_image, 
          });
        });
        
        return categoriesFormatted;
      })
    );
  }

  getProducts(param:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/items/getProducts?${param}`).pipe(
      map((hotProd:any)=>{
        let hotProdFormatted: Products[] =[];
  
        hotProd.forEach((hot:any)=>{
          hotProdFormatted.push({
            productId:hot.id, 
            name: hot.product_name, 
            img: hot.product_image ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
              + hot.product_image) : hot.product_image,
            price: hot.cur_price_a,
            likes: hot.likes
          });
        });
  
        return hotProdFormatted;
      }),
    )
  }

  searchProducts(searchString:string) : Observable<any[]>{
    return this.http.get(`${this.apiUrl}/api/items/searchProducts?searchString=${searchString}`).pipe(
      map((searchResult:any)=>{
        let result: Products[] =[];
  
        searchResult.forEach((res:any)=>{
          result.push({
            productId:res.id, 
            name: res.product_name, 
            img: res.product_image ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
              + res.product_image) : res.product_image,
            price: res.cur_price_a,
            category: res.category_name,
            likes: res.likes

          });
        });
  
        return result;
      })
    )
  }

  getSoldTodayCount(productId:any){
    return this.http.get(`${this.apiUrl}/api/items/getSoldToday?productId=${productId}`).pipe(
      map((sold:any)=>{
        if(sold.length > 0){
          return sold[0].quantity;
        } else {
          return '';
        }
      }))
    
  }

  like(data:any){
    return this.http.post(`${this.apiUrl}/api/items/like`, data);
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
  price?: string,
  category?: string,
  likes?: any
}


