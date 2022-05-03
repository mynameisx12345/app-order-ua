import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.scss']
})
export class DisplayCategoriesComponent implements OnInit {
  categories = [
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
    {img: '#', name: 'Category'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
