import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/common.service';
import { MainProductBrowserService } from 'src/app/main-product-browser/main-product-browser.service';
import { ActionsService } from '../actions.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit, AfterViewInit {
  isMobile = this.commonService.isMobile;
  dataSource = new MatTableDataSource;
  displayedColumns = ['id','name', 'img', 'action'];
  loadCategories$ = new BehaviorSubject(false);
  currentDialog: any;
  viewImage:any;
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild('image') image:any;

  constructor(
    private readonly commonService: CommonService,
    private readonly mainService: MainProductBrowserService,
    private readonly dialog: MatDialog,
    private readonly actionService: ActionsService
  ) { }

  ngOnInit(): void {
    this.loadCategories$.pipe(
      filter(load=>load),
      switchMap(()=>this.mainService.getProductCategories()),
      tap((result)=>{
        
        this.dataSource.data = result.sort((a:any,b:any)=>Number(a.id)>Number(b.id) ? -1 : 1);
        this.loadCategories$.next(false);
      })
    ).subscribe();
    this.loadCategories$.next(true);
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showImage(bImage:string){
    this.viewImage = bImage;
    this.currentDialog = this.dialog.open(this.image,{
      height:'auto'
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCategory(){
    this.currentDialog = this.dialog.open(AddCategoryComponent,{
      disableClose: true,
      width: this.isMobile ? '80%' : '30%',
      data: {
        mode:'add',
        value: {}
      }
    });

    this.currentDialog.afterClosed().subscribe((res:any)=>{
      if(res.isSave){
        const formData: FormData = new FormData();
        formData.append('category_image', res.data.image);
        formData.append('category_name', res.data.name);
        this.actionService.saveCategory(formData).pipe(
          tap(()=>{
            this.loadCategories$.next(true);
            this.commonService.showSuccess(`Category ${res.data.name} is saved`);
          })
        ).subscribe();
      }
    })
  }

  editCategory(category:any){
    console.log('category', category);
    this.currentDialog = this.dialog.open(AddCategoryComponent,{
      disableClose: true,
      width: this.isMobile ? '80%' : '30%',
      data: {
        mode:'add',
        value: {
          name: category.name,
          image: category.img
        }
      }
    });
  }

  removeCategory(id:any){
    this.actionService.removeCategory(id).pipe(
      catchError(error=>{
        this.commonService.showError('Cannot remove. Category is being used.');
        return throwError(error);
      }),
      tap(()=>{
        this.commonService.showSuccess('Removed Successfully');
        this.loadCategories$.next(true);
      })
    ).subscribe();
  }

}
