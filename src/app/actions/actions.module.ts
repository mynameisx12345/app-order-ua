import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import { ActionsRoutingMdule } from './actions-routing.module';
import { CoreModule } from './../core/core.module';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    ActionsComponent,
    QueueComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingMdule,
    CoreModule
  ]
})
export class ActionsModule { }
