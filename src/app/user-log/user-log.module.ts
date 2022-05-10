import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogComponent } from './user-log.component';
import { UserLogRoutingModule } from './user-log-routing.module';
import { CoreModule } from './../core/core.module';

@NgModule({
  declarations: [
    UserLogComponent
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
