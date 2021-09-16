import {Component} from '@angular/core';
import {Api} from "../../providers/api";
import {IWebinar} from "../../interfaces/webinar";
import {IUser} from "../../interfaces/user";
import {Profile} from "../../providers/profile";

@Component({
  selector: 'page-webinar',
  templateUrl: 'webinar.html',
})

export class WebinarPage {

  webinars: Array<IWebinar> = [];
  user: IUser = null;
  loaded: boolean = false;

  constructor(
    public api: Api
  ) {

    Profile.listen((user: IUser) => {
      this.user = user;
    });

    this.api.webinar().then((webinars: Array<IWebinar>) => {
      this.webinars = webinars;
      this.loaded = true;
    });
  }
}
