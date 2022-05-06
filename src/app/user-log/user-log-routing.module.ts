import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogComponent } from './user-log.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'log-in', component: UserLogComponent, children: []}
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
