import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/common.service';
import { MainProductBrowserService } from 'src/app/main-product-browser/main-product-browser.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Output() getProducts = new EventEmitter();
  laodCategories$ = new BehaviorSubject(false);
  categories$ = this.laodCategories$.pipe(
    filter(load=>load),
    switchMap(load=>this.mainService.getProductCategories()),
    tap(cat=>{
      this.laodCategories$.next(false);
    })
  )
  selectedCategoryId = new BehaviorSubject(null);
  isMobile = this.commonService.isMobile;
  selectedCategoriIdA: any;
  


  constructor(
    private readonly mainService: MainProductBrowserService,
    private route: ActivatedRoute,
    private readonly commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.laodCategories$.next(true);
    this.route.queryParams.subscribe(param=>{
      this.selectedCategoryId.next(param.id);
      this.selectedCategoriIdA = param.id;
    });

    this.selectedCategoryId.pipe(
      filter(id=>id !== null),
      switchMap(id=>this.mainService.getProducts(`category=${id}`)),
      tap(products=>{
        this.getProducts.emit(products);
      })
    ).subscribe();

  }

  selectionChangeA(event:MatSelectionListChange){
    this.selectedCategoryId.next(event.options[0].value);
  }

  selectionChangeB(event:any){
    console.log('testtesttest', event)
    this.selectedCategoryId.next(event.value);
  }

}
