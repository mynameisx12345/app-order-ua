import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  message = "This project is targetting to increase the efficiency of school canteen's daily operation as well as to improve the the services provided to its customers";
  isMobile = this.commonService.isMobile;
  devTeam = [
    'Lesly A. Bartolo',
    'Nikka Romela C. Alpas',
    'Jessa Mae M. Perez',
    'Jorelyn R. Tonog'
  ]
  constructor(
    private readonly commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

}
