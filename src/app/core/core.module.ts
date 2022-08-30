import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatSelectModule } from '@angular/material/select'
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QRCodeModule } from 'angularx-qrcode';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScanResultComponent } from './components/qr-scan-result/qr-scan-result.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PaymentComponent } from './components/qr-scan-result/payment/payment.component';
import { MatSortModule } from '@angular/material/sort';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import { CommentComponent } from './components/comment/comment.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductCardComponent,
    QrScannerComponent,
    QrScanResultComponent,
    BreadcrumbComponent,
    PaymentComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    QRCodeModule,
    ZXingScannerModule,
    RouterModule,
    MatAutocompleteModule,
    MatSortModule,
    NgxHideOnScrollModule,
    MatTooltipModule,
    FormsModule
  ],
  exports: [
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ProductCardComponent,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    QRCodeModule,
    QrScannerComponent,
    ZXingScannerModule,
    BreadcrumbComponent,
    MatAutocompleteModule,
    MatSortModule,
    NgxHideOnScrollModule,
    CommentComponent,
    MatTooltipModule,
    FormsModule
  ]
})
export class CoreModule { }
