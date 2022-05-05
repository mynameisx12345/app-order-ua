import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MainProductBrowserService } from '../main-product-browser.service';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.scss']
})
export class DisplayCategoriesComponent implements OnInit {
  categories = [
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
  ]

  loadCategories$ = new BehaviorSubject(false);
  categories$ = this.loadCategories$.pipe(
    filter(load=>load),
    switchMap(load=>this.mainService.getProductCategories()),
    tap(cat=>{
      this.loadCategories$.next(false);
    })
  )
  constructor(
    private readonly mainService: MainProductBrowserService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories$.next(true);
  }

  goToCategory(categoryId:number){
    console.log('categoryid', categoryId);
    this.router.navigate(['/product-categories'],{queryParams:{id:categoryId}});
  }

}

export interface Category{
  id: number,
  name?: string,
  img?: any
}
