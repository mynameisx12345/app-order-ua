import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/common.service';
import { MainProductBrowserService } from 'src/app/main-product-browser/main-product-browser.service';
import { ActionsService } from '../actions.service';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: any;
  categories$ = this.mainService.getProductCategories();

  dataSource = new MatTableDataSource;
  displayedColumns = ['productId','name','category','price','image','action'];
  loadProducts$ = new BehaviorSubject(false);
  isMobile = this.commonService.isMobile;
  viewImage:any;
  currentDialog: any;
  @ViewChild('image') image:any;
  constructor(
    private readonly mainService: MainProductBrowserService,
    private readonly commonService: CommonService,
    private readonly dialog: MatDialog,
    private readonly actionService: ActionsService
  ) { }

  ngOnInit(): void {
    this.loadProducts$.pipe(
      filter(load=>load),
      switchMap(()=> this.mainService.searchProducts('')),
      tap((result)=>{
        this.dataSource.data  = result;
        this.loadProducts$.next(false);
      })
    ).subscribe();

    this.loadProducts$.next(true);

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showImage(bImage:string){
    this.viewImage = bImage;
    this.currentDialog = this.dialog.open(this.image,{
      height:'auto'
    })
  }

  addProduct(){
    this.currentDialog = this.dialog.open(AddProductComponent,{
      disableClose: true,
      width: this.isMobile ? '80%' : '30%'
    });

    this.currentDialog.afterClosed().subscribe((res:any)=>{
      if(res.isSave){
        const formData: FormData = new FormData();
        formData.append('product_name',res.data.description);
        formData.append('product_category',res.data.category);
        formData.append('price',res.data.price);
        formData.append('product_image', res.data.image);
        this.actionService.saveProduct(formData).pipe(
          tap(()=>{
            this.loadProducts$.next(true);
            this.commonService.showSuccess(`Product ${res.data.description} is saved`);
          })
        ).subscribe();
      }
    })
  }

}
