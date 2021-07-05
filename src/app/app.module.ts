import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CacheService } from './services/cache.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [    
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: '<client id>', // This is your client ID
        authority: 'https://login.microsoftonline.com/<tenant id>', // This is your tenant ID
        redirectUri: 'http://localhost:4200'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
    }, {
      popUp: !isIE,
      consentScopes: [],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://shoestore-products-aspnetcore-azure.azurewebsites.net/products', 
        ['api://<enter products api client id here>/access_as_user' ]],
      ],
      extraQueryParameters: {}
    })  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    CacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }