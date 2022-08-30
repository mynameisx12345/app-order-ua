import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActionsService } from 'src/app/actions/actions.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userTypes = [
    {label:'Student', value:'student', hasApproval: false},
    {label:'Teacher', value:'teacher', hasApproval: true},
    //{label:'Visitor', value:'visitor', hasApproval: false},
    {label:'Clerk', value:'clerk', hasApproval: true},
    {label:'Administrator', value:'admin', hasApproval:true}
  ];
  isMobile = this.commonService.isMobile;
  userTypeMsg:any;
  userFg:any;
  constructor(
    private readonly commonService: CommonService,
    private readonly fb: FormBuilder,
    private readonly actionService: ActionsService,
    private readonly router: Router
  ) { 
    this.userFg = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      userType: ['', Validators.required]
    });

    this.userFg.controls.userType.valueChanges.subscribe((value:any)=>{
      switch (value){
        case 'student':
        case 'visitor':
          this.userTypeMsg = '';
          break;
        case 'teacher':
        case 'clerk':
        case 'admin':
          this.userTypeMsg = 'Requires Admin Approval';
          break;
      }
    })
  }

  ngOnInit(): void {
  }

  signUp(){
    let data = {
      email: this.userFg.controls.email.value,
      password: this.userFg.controls.password.value,
      first_name: this.userFg.controls.firstName.value,
      middle_name: this.userFg.controls.middleName.value,
      last_name: this.userFg.controls.lastName.value,
      user_type: this.userFg.controls.userType.value,
      is_approved: this.userTypeMsg === ''
    }
    this.actionService.addUser(data).pipe(
      catchError((error:any)=>{
        this.commonService.showError('Email already registered.');
        return throwError(error);
      })
    ).subscribe((ret:any)=>{
      this.commonService.showSuccess('Sign Up Successfully');
      this.router.navigate(['/home']);
    });
  }

  

}
