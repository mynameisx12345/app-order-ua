import { Component, Input, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() currentValue = 1;
  list = [
    {id:1,name:'Accounts',icon:'manage_accounts', link:''},
    {id:2,name:'Categories',icon:'toll', link: '/manage-categories'},
    {id:3,name:'Featured Products',icon:'star', link:'/manage-featured'},
    {id:4,name:'Products',icon:'lunch_dining', link: '/manage-products'}
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openPage(event:MatSelectionListChange){
    this.currentValue = event.options[0].value;
    const link:any = this.list.find(a=>a.id === this.currentValue)?.link;
    this.router.navigate([link]);
  }

}
