import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { GuardService } from '../core/services/guard.service';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';

const routes: Routes = [
  {path: 'manage-products', canActivate: [GuardService], component: ManageProductsComponent, children: [], data:{breadcrumb:'Manage Products'}},
  {path: 'manage-categories', canActivate:[GuardService], component: ManageCategoriesComponent, children:[], data:{breadcrumb: 'Manage Categories'}}
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
