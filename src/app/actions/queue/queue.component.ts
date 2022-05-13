import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit, OnDestroy {
  loadQueue$ = new BehaviorSubject(false);
  queueInterVal:any;
  currentUser$ = this.userService.currentUser$;
  queue$:any = this.loadQueue$.pipe(
    filter(load=>load),
    switchMap(load=>this.actionsService.getOrders('status=Q')),
    tap(orders=>{
      console.log('ordersorders', orders);
      this.loadQueue$.next(false);
    })
  )
  constructor(
    private readonly actionsService: ActionsService,
    private readonly userService: UserLogService
  ) { }

  ngOnInit(): void {
    this.loadQueue$.next(true);

    this.queueInterVal = setInterval(()=>{
      this.loadQueue$.next(true);
    },4000)
  }
  ngOnDestroy(): void {
    clearInterval(this.queueInterVal);
  }

}
