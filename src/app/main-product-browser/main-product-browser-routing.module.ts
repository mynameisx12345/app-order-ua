import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainProductBrowserComponent } from './main-product-browser.component';
import { GuardService } from '../core/services/guard.service';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductComponent } from './product/product.component';
import { GuardRoleService } from '../core/services/guard-role.service';

const routes: Routes = [
  {path: '', component: MainProductBrowserComponent, data: {breadcrumb:'Home'}, 
    children: []},
  {path: 'search-products',component:SearchProductComponent, data: {breadcrumb: 'Products Search Result'} },
  {path: 'product', component: ProductComponent, data: {breadcrumb: 'Product'}}
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
