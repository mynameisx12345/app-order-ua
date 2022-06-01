import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pipe } from 'rxjs';
import { debounce, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { MainProductBrowserService } from 'src/app/main-product-browser/main-product-browser.service';

@Component({
  selector: 'app-add-featured',
  templateUrl: './add-featured.component.html',
  styleUrls: ['./add-featured.component.scss']
})
export class AddFeaturedComponent implements OnInit {
  formGroup: any;
  options$: any;
  constructor(
    private readonly dialogRef: MatDialogRef<AddFeaturedComponent>,
    private readonly mainService: MainProductBrowserService,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) { 
    this.formGroup = this.fb.group({
      searchString: [''],
      searchResult: ['', Validators.required]
    });

    this.options$ = this.formGroup.controls['searchString'].valueChanges.
      pipe(
        debounceTime(500),
        switchMap((value:string)=>this.mainService.searchProducts(value)),
        map((searchResult:any)=>{
          const finalList = searchResult.filter((res:any)=>{
            return data.featuredList.findIndex((feat:any)=> feat.productId === res.productId) < 0
          });
          
          return finalList;

        })
      );
  }

  ngOnInit(): void {
  }

  closeDialog(isSave:boolean, data:{}){
    this.dialogRef.close({isSave: isSave, data:data});
  }

  optionsSelected(event:any){
    this.formGroup.patchValue({searchString:event.option.viewValue, searchResult: event.option.value});
  }

}
