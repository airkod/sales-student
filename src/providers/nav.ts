import {Injectable} from '@angular/core';
import {App} from "ionic-angular";
import {Profile} from "./profile";
import {ChatPage} from "../pages/chat/chat";
import {Modal} from "./modal";
import {HomePage} from "../pages/home/home";
import {WebinarPage} from "../pages/webinar/webinar";
import {AdditionalPage} from "../pages/additional/additional";
import {ProductsPage} from "../pages/products/products";
import {SettingsPage} from "../pages/settings/settings";
import {PaymentsPage} from "../pages/payments/payments";
import {Api} from "./api";
import {INotification} from "../interfaces/notification";

@Injectable()

export class Nav {

  constructor(
    public app: App,
    public modal: Modal,
    public api: Api
  ) {
  }

  public root(page, params = {}, direction: string = 'forward') {

    if (!this.canNav(page)) {
      return;
    }

    return this.app.getActiveNavs()[0].setRoot(page, params, {
      animate: true,
      direction: direction
    });
  }

  public push(page, params?) {

    if (!this.canNav(page)) {
      return;
    }

    return this.app.getActiveNavs()[0].push(page, params, {
      animate: true,
      direction: 'forward'
    });
  }

  public pop() {
    this.app.getActiveNavs()[0].pop();
  }

  public reload() {
    this.root(this.app.getActiveNavs()[0].getActive().component);

  }

  public canNav(page) {

    if (page == ChatPage && !Profile.isSterling()) {
      this.modal.message('Вам не доступен чат с преподавателем');
      return false;
    }

    return true;
  }

  public notification(notification: INotification) {

    switch (notification.destination) {

      case 'chat':
        this.root(ChatPage);
        break;

      case 'billing':
        this.root(PaymentsPage);
        break;

      case 'home-task':
        this.root(HomePage, {lesson: notification.data});
        break;

      case 'lesson':
        this.root(HomePage, {lesson: notification.data});
        break;

      case 'additional':
        this.root(AdditionalPage, {additional: notification.data});
        break;

      case 'course':
        this.root(HomePage);
        break;

      case 'webinar':
        this.root(WebinarPage);
        break;
    }

    this.api.maskAsRead(notification);
  }

  public lazy(page: string) {

    switch (page) {

      case 'home':
        this.root(HomePage);
        break;

      case 'webinar':
        this.root(WebinarPage);
        break;

      case 'additional':
        this.root(AdditionalPage);
        break;

      case 'products':
        this.root(ProductsPage);
        break;

      case 'settings':
        this.root(SettingsPage);
        break;

      case 'payment':
        this.root(PaymentsPage);
        break;

      case 'chat':
        this.root(ChatPage);
        break;

      case 'forgotPassword':
        // this.root(ForgotPasswordPage);
        break;

    }
  }
}
