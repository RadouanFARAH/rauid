import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { TokeninterseptService } from './interseptors/tokenintersept.service';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('token');
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicStorageModule.forRoot(), JwtModule.forRoot({
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory,
      deps: [Storage]
    }
  }), IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, FontAwesomeModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokeninterseptService, multi: true },
    SplashScreen,
    StatusBar,
    CallNumber,
    Geolocation,

    Printer,
    LaunchNavigator
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }

}
