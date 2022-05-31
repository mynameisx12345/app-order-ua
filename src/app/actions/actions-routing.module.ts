import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { GuardService } from '../core/services/guard.service';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageFeaturedComponent } from './manage-featured/manage-featured.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';

const routes: Routes = [
  {path: 'manage-products', canActivate: [GuardService], component: ManageProductsComponent, children: [], data:{breadcrumb:'Manage Products'}},
  {path: 'manage-categories', canActivate:[GuardService], component: ManageCategoriesComponent, children:[], data:{breadcrumb: 'Manage Categories'}},
  {path: 'manage-featured', canActivate: [GuardService], component: ManageFeaturedComponent, children:[], data:{breadcrumb: 'Manage Featured Products'}},
  {path: 'manage-accounts', canActivate:[GuardService], component: ManageAccountsComponent, children: [], data:{breadcrumb: 'Manage Accounts'}}
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
