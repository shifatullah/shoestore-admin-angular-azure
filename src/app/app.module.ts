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
        clientId: 'dde03603-a33b-427a-be82-9fe520f568ec', // This is your client ID
        authority: 'https://login.microsoftonline.com/5956e8fe-c09d-4798-911a-d7d612dcbbb7', // This is your tenant ID
        redirectUri: 'https://shoestore-admin-angular-azure.azurewebsites.net'// This is your redirect URI
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
        ['api://aed6c30b-b312-4297-8525-9f0459038bc3/access_as_user' ]],
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