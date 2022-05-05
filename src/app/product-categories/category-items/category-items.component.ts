import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit {
  @Input() products: any;
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
