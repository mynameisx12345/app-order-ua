import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoriesComponent } from './product-categories.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'product-categories', component: ProductCategoriesComponent, children: []}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductCategoriesRoutingModule { }
