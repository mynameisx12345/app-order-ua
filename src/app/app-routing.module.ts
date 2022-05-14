import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrScannerComponent} from './core/components/qr-scanner/qr-scanner.component'
import { QrScanResultComponent } from './core/components/qr-scan-result/qr-scan-result.component';
import { GuardService } from './core/services/guard.service';
const routes: Routes = [
  {path: '', canActivate: [GuardService], redirectTo: '/home', pathMatch: 'full'},
  //{path: '**', redirectTo: '/home', pathMatch: 'full'},
  {path: 'qr-scan', component:QrScannerComponent},
  {path: 'qr-result',canActivate: [GuardService], component:QrScanResultComponent, data: {breadcrumb:'QR Scan Result'}},
  {path: 'home', loadChildren: ()=> import('./main-product-browser/main-product-browser.module').then(m=>m.MainProductBrowserModule)},
  {path: 'categories', canActivate: [GuardService], loadChildren: ()=> import('./product-categories/product-categories.module').then(m=>m.ProductCategoriesModule)},
  {path: 'user', canActivate: [GuardService], loadChildren: ()=> import('./user-log/user-log.module').then(m=>m.UserLogModule)},
  {path: 'cart', canActivate: [GuardService], loadChildren: ()=> import('./cart/cart.module').then(m=>m.CartModule)},
  {path: 'actions',canActivate: [GuardService], loadChildren: ()=>import('./actions/actions.module').then(m=>m.ActionsModule)},
  //{path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
