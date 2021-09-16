import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatusBar} from "@ionic-native/status-bar";
import {Modal} from "../providers/modal";
import {Loader} from "../providers/loader";
import {Api} from "../providers/api";
import {Cache} from "../providers/cache";
import {HttpClientModule} from "@angular/common/http";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {Nav} from "../providers/nav";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import {ComponentsModule} from "../components/components.module";
import {SettingsPage} from "../pages/settings/settings";
import {PaymentsPage} from "../pages/payments/payments";
import {PipesModule} from "../pipes/pipes.module";
import {Cart} from "../providers/cart";
import {ProductsPage} from "../pages/products/products";
import {AdditionalPage} from "../pages/additional/additional";
import {WebinarPage} from "../pages/webinar/webinar";
import {ChatPage} from "../pages/chat/chat";
import {TariffPage} from "../pages/tariff/tariff";
import {Updates} from "../providers/updates";
import {WayForPay} from "../providers/wayforpay";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    SettingsPage,
    PaymentsPage,
    ProductsPage,
    WebinarPage,
    AdditionalPage,
    ChatPage,
    TariffPage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    IonicModule,
    IonicModule.forRoot(MyApp),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    SettingsPage,
    PaymentsPage,
    ProductsPage,
    WebinarPage,
    AdditionalPage,
    ChatPage,
    TariffPage,
  ],
  providers: [
    StatusBar,
    Modal,
    Loader,
    Api,
    Cache,
    Nav,
    Cart,
    Updates,
    WayForPay,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
