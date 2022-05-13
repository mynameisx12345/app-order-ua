import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { GuardService } from '../core/services/guard.service';

const routes: Routes = [
  {path: 'shopping-cart', canActivate: [GuardService], component: CartComponent, children: []}
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
export class CartRoutingModule { }
