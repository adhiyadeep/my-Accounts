import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { NetworkProvider } from '../providers/network/network';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonProvider } from '../providers/common/common';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworkProvider,
    CommonProvider,
  ]
})
export class AppModule {}
