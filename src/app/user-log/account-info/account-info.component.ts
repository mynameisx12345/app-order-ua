import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  @Input() currentValue = 1;
  list = [
    {id:1,name:'My Account',icon:'account_circle'},
    {id:2,name:'My Orders',icon:'inbox'},
    {id:3,name:'My Notifications',icon:'notifications'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
