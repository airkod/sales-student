import {Component} from '@angular/core';
import {Nav} from "../../providers/nav";
import {Api} from "../../providers/api";
import {IException} from "../../interfaces/exception";
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";
import {Modal} from "../../providers/modal";

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})

export class ForgotPasswordPage {

  email: string = '';
  error: string = null;

  constructor(
    public nav: Nav,
    public api: Api,
    public modal: Modal
  ) {

  }

  forgotPassword() {

    this.api
      .forgotPassword(this.email)
      .then(() => {
        this.modal.message('Новый пароль успешно отправлен на вашу почту. На всякий случай проверьте папку Спам.', () => {
          this.nav.root(LoginPage);
        });
      })
      .catch((e: IException) => {
        this.error = e.message
      });
  }

  register() {
    this.nav.root(RegisterPage);
  }

  auth() {
    this.nav.root(LoginPage);
  }
}
