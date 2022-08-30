import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogComponent } from './user-log.component';
import { UserLogRoutingModule } from './user-log-routing.module';
import { CoreModule } from './../core/core.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserLogComponent,
    AccountInfoComponent,
    MyOrdersComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserLogRoutingModule,
    CoreModule
  ],
  exports: [
  ]
})
export class UserLogModule { }
