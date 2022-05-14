import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProductBrowserComponent } from './main-product-browser.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from '../core/core.module';
import { HotTodayComponent } from './hot-today/hot-today.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { DisplayCategoriesComponent } from './display-categories/display-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { MainProductBrowserRoutingModule } from './main-product-browser-routing.module';
import { ProductCategoriesModule } from '../product-categories/product-categories.module';
import { SearchProductComponent } from './search-product/search-product.component';

@NgModule({
  declarations: [
    MainProductBrowserComponent,
    HeaderComponent,
    HotTodayComponent,
    MyFavoritesComponent,
    DisplayCategoriesComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    MainProductBrowserRoutingModule,
    ProductCategoriesModule
  ],
  exports: [
    MainProductBrowserComponent,
    HeaderComponent
  ]
})
export class MainProductBrowserModule { }
