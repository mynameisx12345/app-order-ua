import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogService } from 'src/app/user-log/user-log.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit, AfterViewInit {
  qrValue ='';
  action = '';
  uiUrl = environment.uiUrl;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  @ViewChild('scanner') scanner:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((param:any)=>{
      this.action = param.action;
    });
  }

  ngAfterViewInit(): void {
    this.scanner.camerasFound.subscribe((res:any)=>{
    })
  }

  handleQrCodeResult(resultString: string) {
    this.qrValue = resultString;
    window.open(`${this.uiUrl}/qr-result?qrValue=${this.qrValue}&action=${this.action}`,'_self');
  }
}
