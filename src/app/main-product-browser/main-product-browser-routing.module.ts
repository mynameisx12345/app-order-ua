import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainProductBrowserComponent } from './main-product-browser.component';
import { GuardService } from '../core/services/guard.service';

const routes: Routes = [
  {path: 'home', canActivate: [GuardService], component: MainProductBrowserComponent, children: []}
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
export class MainProductBrowserRoutingModule { }
