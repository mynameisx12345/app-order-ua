import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() currentValue = 1;
  list = [
    {id:1,name:'Accounts',icon:'manage_accounts'},
    {id:2,name:'Categories',icon:'toll'},
    {id:3,name:'Featured Products',icon:'star'},
    {id:4,name:'Products',icon:'lunch_dining'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
