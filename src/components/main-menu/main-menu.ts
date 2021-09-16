import {Component} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {Profile} from "../../providers/profile";
import {INotification} from "../../interfaces/notification";
import {Api} from "../../providers/api";
import {Nav} from "../../providers/nav";

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.html'
})

export class MainMenuComponent {

  user: IUser = null;
  notifications: Array<INotification> = [];
  notificationVisibility: boolean = false;

  constructor(
    public api: Api,
    public nav: Nav
  ) {
    Profile.listen((user: IUser) => {
      this.user = user;
    });

    Profile.notifications((notifications: Array<INotification>) => {
      this.notifications = notifications;
    });
  }

  ngAfterViewInit() {
    (<any>window).M.AutoInit();
  }
}
