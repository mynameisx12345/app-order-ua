import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppMainComponent } from './app-main.component';
import { RouterModule  } from '@angular/router';
import { MainProductBrowserModule } from './../main-product-browser/main-product-browser.module'
import { CoreModule } from './../core/core.module';
import { ProductCategoriesModule } from './../product-categories/product-categories.module';

@NgModule({
  declarations: [
    AppMainComponent,
    AppHeaderComponent, 
    AppFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainProductBrowserModule,
    CoreModule,
    ProductCategoriesModule
  ],
  exports: [
    AppMainComponent
  ]
})
export class AppMainModule { }
