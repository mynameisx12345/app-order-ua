import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainProductBrowserModule} from './main-product-browser/main-product-browser.module';
import { CoreModule } from './core/core.module';
import { AppMainModule } from './app-main/app-main.module';
import { RouterModule } from '@angular/router';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainProductBrowserModule,
    ProductCategoriesModule,
    CoreModule,
    AppMainModule,
    RouterModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
