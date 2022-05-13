import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogComponent } from './user-log.component';
import { Routes, RouterModule } from '@angular/router';
import { AccountInfoComponent } from './account-info/account-info.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { GuardService } from '../core/services/guard.service';

const routes: Routes = [
  {path: 'log-in', component: UserLogComponent, children: []},
  {path: 'my-orders', component: MyOrdersComponent,  canActivate:[GuardService],children: [] }
];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserLogRoutingModule { }
