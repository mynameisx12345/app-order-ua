import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ActionsService } from '../../actions.service';

@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.scss']
})
export class DailySalesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator:any;
  @ViewChild(MatSort) sort:any;
  displayedColumns = ['date', 'total'];
  dataSource = new MatTableDataSource;
  loadSales$ = new BehaviorSubject(false);

  constructor(
    private readonly actionService: ActionsService
  ) { }

  ngOnInit(): void {
    this.loadSales$.pipe(
      filter(load=>load),
      switchMap(()=>this.actionService.getDailySalesReport()),
      tap((sales:any)=>{
        this.dataSource.data = sales;
        this.loadSales$.next(false);
      })
    ).subscribe();

    this.loadSales$.next(true);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
