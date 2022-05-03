import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-today',
  templateUrl: './hot-today.component.html',
  styleUrls: ['./hot-today.component.scss']
})
export class HotTodayComponent implements OnInit {
  hotProducts = [
    {productId:1, name: 'ProductProductProductProductProduct Product Product Product Product Product Product Product Product Product', img: '', price:'100.00'},
    {productId:1, name: 'Product', img: '', price:'100.00'},
    {productId:1, name: 'Product', img: '', price:'100.00'},
    {productId:1, name: 'Product', img: '', price:'100.00'},
    {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
    // {productId:1, name: 'Product', img: '', price:'100.00'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
