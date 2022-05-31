import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/common.service';
import { MainProductBrowserService } from 'src/app/main-product-browser/main-product-browser.service';
import { ActionsService } from '../actions.service';
import { AddFeaturedComponent } from './add-featured/add-featured.component';

@Component({
  selector: 'app-manage-featured',
  templateUrl: './manage-featured.component.html',
  styleUrls: ['./manage-featured.component.scss']
})
export class ManageFeaturedComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: any;
  isMobile = this.commonService.isMobile;
  dataSource = new MatTableDataSource;
  displayedColumns = ['productId','name','price','image','action'];
  loadHotProducts$ = new BehaviorSubject(false);
  currentDialog: any;
  viewImage:any;
  @ViewChild('image') image:any;
  constructor(
    private readonly commonService: CommonService,
    private readonly mainService: MainProductBrowserService,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    private readonly actionService: ActionsService
  ) { }

  ngOnInit(): void {
    this.loadHotProducts$.pipe(
      filter(load=>load),
      switchMap(()=>this.mainService.getHotProducts()),
      map((hotProd:any)=>{
        let hotProdFormatted: any =[];
  
        hotProd.forEach((hot:any)=>{
          hotProdFormatted.push({
            productId:hot.id, 
            name: hot.product_name, 
            img: hot.product_image ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
              + hot.product_image) : hot.product_image,
            price: hot.cur_price_a
          });
        });
  
        return hotProdFormatted;
      }),
      tap(hotProdFormatted=>{
        this.dataSource.data = hotProdFormatted;
        this.loadHotProducts$.next(false);
      })
    ).subscribe();
    this.loadHotProducts$.next(true);
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

  addFeatured(){
    this.currentDialog = this.dialog.open(AddFeaturedComponent,{
      disableClose: true,
      width: this.isMobile ? '80%' : '30%',
      data: {featuredList: this.dataSource.data}
    });

    this.currentDialog.afterClosed().subscribe((res:any)=>{
      if(res.isSave){
        this.actionService.saveHotProduct({
          product_id: res.data.searchResult
        }).pipe(
          tap(()=>{
            this.loadHotProducts$.next(true);
            this.commonService.showSuccess(`Hot Product ${res.data.searchResult} is saved`)
          })
        ).subscribe();
      }
    })
  }

}
