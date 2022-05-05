import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoriesComponent } from './product-categories.component';
import { ProductCategoriesRoutingModule } from './product-categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CoreModule } from  './../core/core.module';
import { CategoryItemsComponent } from './category-items/category-items.component';

@NgModule({
  declarations: [
    ProductCategoriesComponent,
    CategoryListComponent,
    CategoryItemsComponent
  ],
  imports: [
    CommonModule,
    ProductCategoriesRoutingModule,
    CoreModule
  ],
  exports: [
    ProductCategoriesComponent
  ]
})
export class ProductCategoriesModule { }
