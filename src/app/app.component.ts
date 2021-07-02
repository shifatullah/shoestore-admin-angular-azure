import { Component, OnInit } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title: string;
  constructor(private broadcastService: BroadcastService, private authService: MsalService) { 
    this.title = "ShoeStore Admin";
  }

  ngOnInit() { 
    this.login();
  }

    login() {
      const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

      if (isIE) {
        this.authService.loginRedirect({
          extraScopesToConsent: ["access_as_user"]
        });
      } else {
        this.authService.loginPopup({
          extraScopesToConsent: ["access_as_user"]
        });
      }
  }
}
