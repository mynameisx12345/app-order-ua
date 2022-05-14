import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { GuardService } from '../core/services/guard.service';

const routes: Routes = [
  //{path: 'actions-main', canActivate: [GuardService], component: ActionsComponent, children: []}
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
