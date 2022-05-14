import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoriesComponent } from './product-categories.component';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../core/services/guard.service';

const routes: Routes = [
  {path: 'product-categories', component: ProductCategoriesComponent, data: {breadcrumb:'Product Categories'}}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductCategoriesRoutingModule { }
