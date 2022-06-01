import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  formGroup:any;
  userTypes = [
    {value:' admin',label:'Administrator'},
    {value:' clerk', label:'Canteen Clerk'},
    {value: 'student', label: 'Student'},
    {value: 'teacher', label: 'Teacher'}
  ]
  constructor(
    private readonly dialogRef: MatDialogRef<AddAccountComponent>,
    private readonly fb: FormBuilder
  ) { 
    this.formGroup = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      userType: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  closeDialog(isSave:boolean, data:{}){
    this.dialogRef.close({isSave: isSave, data:data});
  } 

}
