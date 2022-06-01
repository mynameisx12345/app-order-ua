import { Component, OnInit } from '@angular/core';
import { MainProductBrowserService } from '../main-product-browser.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hot-today',
  templateUrl: './hot-today.component.html',
  styleUrls: ['./hot-today.component.scss']
})


export class HotTodayComponent implements OnInit {
  loadHotProducts$ = new BehaviorSubject(false);

  hotProducts$ = this.loadHotProducts$.pipe(
    filter((load)=> load),
    switchMap((load)=> this.mainService.getHotProducts()),
    map((hotProd:any)=>{
      let hotProdFormatted: Products[] =[];

      hotProd.forEach((hot:any)=>{
        hotProdFormatted.push({
          productId:hot.id, 
          name: hot.product_name, 
          img: hot.product_image ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
            + hot.product_image) : hot.product_image,
          price: hot.cur_price_a
        });
      });

      return hotProdFormatted;
    }),
    tap(hotProdFormatted=>{
      this.loadHotProducts$.next(false);
    })
  )

  constructor(
    private readonly mainService: MainProductBrowserService,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadHotProducts$.next(true);
  }

}

interface Products {
  productId: string,
  name?: string,
  img?: any,
  price?: string
}
