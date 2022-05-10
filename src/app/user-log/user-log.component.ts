import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonService } from '../core/services/common.service';
import { UserLogService } from './user-log.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss']
})
export class UserLogComponent implements OnInit {
  isMobile = this.commonService.isMobile;
  userAFg:any;
  userBFg:any;
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private userService: UserLogService,
    private readonly router: Router,
    private readonly location: Location,
    private readonly snackbar: MatSnackBar
  ) { 
    this.userAFg = this.fb.group({
      email: ['teng@mymail.com', Validators.email],
      password: ['12345', Validators.required],
    });

    this.userBFg = this.fb.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
   
  }

  login(){
    const data = {  
      email: this.userAFg.controls.email.value, 
      password: this.userAFg.controls.password.value};
    this.userService.login(data).pipe(
      catchError((error)=>{
        console.log('error', error)
        this.snackbar.open('Incorrect Email or Password',undefined, {verticalPosition: 'top',duration:3000,
        panelClass: ['mat-toolbar', 'mat-warn']});
        return throwError(error);
      })
    ).subscribe((res:any)=>{
      if(res.length > 0){
        this.userService.currentUser$.next(res[0]);
        this.userService.logged.next(true);
        this.location.back();
      }
    });

    
  }

}
