import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SignaturePadModule } from 'angular2-signaturepad';

import { LoginPage } from '../pages/login/login';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleDetailsPage } from '../pages/scheduledetails/scheduledetails';
import { CreateSchedulePage } from '../pages/create-schedule/create-schedule';
import { MessagesPage } from '../pages/messages/messages';
import { MessageDetailsPage } from '../pages/messagedetails/messagedetails';
import { StartVisitPage } from '../pages/start-visit/start-visit';
import { VitalSignsPage } from '../pages/vital-signs/vital-signs';
import { FunctionalPage } from '../pages/functional/functional';
import { PatSignaturePage } from '../pages/pat-signature/pat-signature';
import { MySignaturePage } from '../pages/my-signature/my-signature';
import { UserSettingsPage } from '../pages/user-settings/user-settings';
import { SafetyPage } from '../pages/safety/safety';
import { LocatorPage } from '../pages/locator/locator';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToDoServiceProvider } from '../providers/to-do-service/to-do-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { InterceptorsAuthProvider } from '../providers/interceptors-auth/interceptors-auth';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SchedulePage,
    ScheduleDetailsPage,
    CreateSchedulePage,
    MessagesPage,
    MessageDetailsPage,
    StartVisitPage,
    VitalSignsPage,
    FunctionalPage,
    SafetyPage,
    PatSignaturePage,
    MySignaturePage,
    UserSettingsPage,
    LocatorPage,
    HomePage,
    TabsPage   
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
        backButtonText: ''
     })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SchedulePage,
    ScheduleDetailsPage,
    CreateSchedulePage,
    MessagesPage,
    MessageDetailsPage,
    StartVisitPage,
    VitalSignsPage,
    FunctionalPage,
    SafetyPage,
    PatSignaturePage,
    MySignaturePage,
    UserSettingsPage,
    LocatorPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToDoServiceProvider,
    AuthServiceProvider,
    UserServiceProvider,
    ScreenOrientation,
    {provide: HTTP_INTERCEPTORS, useClass:  InterceptorsAuthProvider, multi: true},
    LocationTrackerProvider,
    BackgroundGeolocation,
    Geolocation,
    Network,
    OneSignal
  ]
})
export class AppModule {}
