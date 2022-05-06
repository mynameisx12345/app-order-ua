import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  loadQueue$ = new BehaviorSubject(false);

  queue$:any = this.loadQueue$.pipe(
    filter(load=>load),
    switchMap(load=>this.actionsService.getOrders('status=Q')),
    tap(orders=>{
      console.log('ordersorders', orders);
      this.loadQueue$.next(false);
    })
  )
  constructor(
    private readonly actionsService: ActionsService
  ) { }

  ngOnInit(): void {
    this.loadQueue$.next(true);

    setInterval(()=>{
      this.loadQueue$.next(true);
    },4000)
  }

}
