import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/common.service';
import { ActionsService } from '../actions.service';
import { AddAccountComponent } from './add-account/add-account.component';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: any;
  isMobile = this.commonService.isMobile;
  dataSource = new MatTableDataSource;
  displayedColumns = ['userId','email','firstname','middlename','lastname','userType','action'];

  loadAccounts$ = new BehaviorSubject(false);
  currentDialog: any;

  constructor(
    private readonly commonService: CommonService,
    private readonly actionService: ActionsService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadAccounts$.pipe(
      filter(load=>load),
      switchMap(()=>this.actionService.getUserAccounts()),
      tap((accounts)=>{
        const sorted = accounts.sort((a:any,b:any)=>Number(a.userId)> Number(b.userId) ? -1 : 1);
        this.dataSource.data = sorted;
        this.loadAccounts$.next(false);
      })
    ).subscribe();
    this.loadAccounts$.next(true);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAccount(){
    this.currentDialog = this.dialog.open(AddAccountComponent,{
      disableClose: true,
      width: this.isMobile ? '80%' : '30%'
    });

    this.currentDialog.afterClosed().subscribe((res:any)=>{
      if(res.isSave){
        this.actionService.addUser({
          email: res.data.email,
          password: res.data.password,
          first_name: res.data.firstname,
          middle_name: res.data.middlename,
          last_name: res.data.lastname,
          user_type: res.data.userType
        }).pipe(
          tap(()=>{
            this.loadAccounts$.next(true);
            this.commonService.showSuccess(`User ${res.data.firstname} is saved;`)
          })
        ).subscribe();
      }
    })

  }

}
