import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import { ActionsRoutingMdule } from './actions-routing.module';
import { CoreModule } from './../core/core.module';
import { QueueComponent } from './queue/queue.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AddProductComponent } from './manage-products/add-product/add-product.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { AddCategoryComponent } from './manage-categories/add-category/add-category.component';

@NgModule({
  declarations: [
    ActionsComponent,
    QueueComponent,
    ManageProductsComponent,
    AddProductComponent,
    ManageCategoriesComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingMdule,
    CoreModule
  ]
})
export class ActionsModule { }
