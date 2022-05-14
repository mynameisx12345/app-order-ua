import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { MainProductBrowserService } from '../main-product-browser.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  searchString = '';
  loadSearch$ = new BehaviorSubject(false);
  searchResult$:any = this.loadSearch$.pipe(
    filter(load=>load),
    switchMap(()=>this.mainService.searchProducts(this.searchString)),
    tap((result:any)=>{
      this.searchResult = result;
      this.loadSearch$.next(false);
    })
  )

  searchResult = [];
  constructor(
    private mainService: MainProductBrowserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.searchResult$.subscribe();
    this.route.queryParams.subscribe((params:any)=>{
      this.searchString = params.searchString;
      console.log('serachsdf', this.searchString,  this.loadSearch$.value)
      
      this.loadSearch$.next(true);
    });
    
  }

  getResultLength(result:any){
    console.log('resultx', result)
    return result !== null && result.length || 0;
  }



}
