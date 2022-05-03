import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProductBrowserComponent } from './main-product-browser.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from '../core/core.module';
import { HotTodayComponent } from './hot-today/hot-today.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { DisplayCategoriesComponent } from './display-categories/display-categories.component';

@NgModule({
  declarations: [
    MainProductBrowserComponent,
    HeaderComponent,
    HotTodayComponent,
    MyFavoritesComponent,
    DisplayCategoriesComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    MainProductBrowserComponent
  ]
})
export class MainProductBrowserModule { }
