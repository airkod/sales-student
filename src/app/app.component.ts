import {Component} from '@angular/core';
import {HomePage} from '../pages/home/home';
import {Profile} from "../providers/profile";
import {Modal} from "../providers/modal";
import {LoginPage} from "../pages/login/login";
import {IUser} from "../interfaces/user";
import {Api} from "../providers/api";
import {INotification} from "../interfaces/notification";
import {Nav} from "../providers/nav";
import {Updates} from "../providers/updates";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootParams: any = {};
  rootPage: any = null;
  user: IUser = null;

  constructor(
    public modal: Modal,
    public api: Api,
    public nav: Nav,
    public updates: Updates
  ) {
    Profile.listen((user: IUser) => {
      this.user = user;
    });

    Profile.signOut(() => {
      this.user = null;
    });

    if (!Profile.isLoggedIn()) {
      this.rootPage = LoginPage;
      return;
    }

    this.rootPage = HomePage;

    let params = new URLSearchParams(window.location.search);

    if (params.get('n')) {

      window.history.replaceState({}, null, "/");

      this.api
        .notification((<INotification>params.get('n')))
        .then((notification: INotification) => {
          this.nav.notification(notification);
        });
    }
  }
}

