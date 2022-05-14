import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainProductBrowserComponent } from './main-product-browser.component';
import { GuardService } from '../core/services/guard.service';
import { SearchProductComponent } from './search-product/search-product.component';

const routes: Routes = [
  {path: '', canActivate: [GuardService], component: MainProductBrowserComponent, data: {breadcrumb:'Home'}, 
    children: []},
  {path: 'search-products', canActivate: [GuardService], component:SearchProductComponent, data: {breadcrumb: 'Products Search Result'} }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //ProductCategoriesModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainProductBrowserRoutingModule { }
