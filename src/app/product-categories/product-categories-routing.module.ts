import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoriesComponent } from './product-categories.component';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../core/services/guard.service';

const routes: Routes = [
  {path: 'product-categories', canActivate: [GuardService], component: ProductCategoriesComponent, children: []}
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
