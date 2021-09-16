import {Component} from '@angular/core';
import {Api} from "../../providers/api";
import {IUser} from "../../interfaces/user";
import {Profile} from "../../providers/profile";
import {IException} from "../../interfaces/exception";
import {Modal} from "../../providers/modal";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {

  public data: IUser = null;
  public errors: any = {};

  public oldPassword: string = null;
  public newPassword: string = null;
  public errorsPassword: any = {};

  constructor(
    public api: Api,
    public modal: Modal
  ) {
    this.data = Profile.get();
  }

  save() {

    this.api
      .profile(this.data)
      .then((user: IUser) => {
        Profile.set(user);
        this.errors = {};
        this.modal.message('Данные успешно сохранены');
      })
      .catch((e: IException) => {
        this.errors = e.errors;
      });
  }

  password() {

    this.api
      .changePassword(this.oldPassword, this.newPassword)
      .then(() => {
        this.errorsPassword = {};
        this.oldPassword = null;
        this.newPassword = null;

        this.modal.message('Пароль успешно сохранен');
      })
      .catch((e: IException) => {
        this.errorsPassword = e.errors;
      });
  }
}
