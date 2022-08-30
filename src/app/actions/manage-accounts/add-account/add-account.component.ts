import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataMatrixDecodedBitStreamParser } from '@zxing/library';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  formGroup:any;
  userTypes = [
    {value:'admin',label:'Administrator'},
    {value:'clerk', label:'Canteen Clerk'},
    {value: 'student', label: 'Student'},
    {value: 'teacher', label: 'Teacher'}
  ];
  isEdit = false;
  constructor(
    private readonly dialogRef: MatDialogRef<AddAccountComponent>,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data:any
  ) { 
    this.formGroup = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      userType: ['', Validators.required],
      isApproved: [''],
      userId: ['']
    });

    if(data.mode === 'edit'){
      this.isEdit = true;
      this.formGroup.patchValue({
        ...data.value,
        password:'1234567890'
      });
    }
  }

  ngOnInit(): void {
  }

  closeDialog(isSave:boolean, data:{}){
    this.dialogRef.close({isSave: isSave, data:data});
  } 

}
