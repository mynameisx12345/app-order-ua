import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  // {path: '**', redirectTo: '/home', pathMatch: 'full'},
  {path: 'main', loadChildren: ()=> import('./main-product-browser/main-product-browser.module').then(m=>m.MainProductBrowserModule)},
  {path: 'categories', loadChildren: ()=> import('./product-categories/product-categories.module').then(m=>m.ProductCategoriesModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
