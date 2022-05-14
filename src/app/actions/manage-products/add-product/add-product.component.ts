import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common.service';
import { MainProductBrowserService } from 'src/app/main-product-browser/main-product-browser.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  categories$ = this.mainService.getProductCategories();
  isMobile = this.commonService.isMobile;
  formGroup:any;
  constructor(
    private readonly mainService: MainProductBrowserService,
    private readonly commonService: CommonService,
    private readonly dialogRef: MatDialogRef<AddProductComponent>,
    private readonly fb: FormBuilder
  ) { 
    this.formGroup = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[.\d]+$/)]]
    })
  }

  ngOnInit(): void {
  }

  closeDialog(isSave:boolean, data:{}){
    this.dialogRef.close({isSave: isSave, data:data});
  }

}
