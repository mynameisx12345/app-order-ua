import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { GuardService } from '../core/services/guard.service';

const routes: Routes = [
  {path: 'shopping-cart', canActivate: [GuardService], component: CartComponent, children: [], data: {breadcrumb:'My Cart'}}
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
export class CartRoutingModule { }
