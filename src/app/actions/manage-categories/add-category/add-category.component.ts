import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  formGroup:any;
  fileToUpload: File | null = null;
  constructor(
    private readonly dialogRef: MatDialogRef<AddCategoryComponent>,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data:any
  ) { 
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      image: ['']
    });

    this.formGroup.patchValue({
      ...data.value
    })
  }

  ngOnInit(): void {
  }

  closeDialog(isSave:boolean, data:{}){
    this.dialogRef.close({isSave: isSave, data:data});
  }

  handleFileInput(files: any) {
    const file = files.target.files;
    this.fileToUpload = file.item(0);
    this.formGroup.patchValue({image: this.fileToUpload});
  }

}
