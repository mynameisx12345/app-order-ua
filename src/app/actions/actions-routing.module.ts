import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { GuardService } from '../core/services/guard.service';
import { ManageProductsComponent } from './manage-products/manage-products.component';

const routes: Routes = [
  {path: 'manage-products', canActivate: [GuardService], component: ManageProductsComponent, children: [], data:{breadcrumb:'Manage Products'}},
  
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
export class ActionsRoutingMdule { }
