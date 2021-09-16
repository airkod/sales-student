import {Component} from '@angular/core';
import {Api} from "../../providers/api";
import {IUser} from "../../interfaces/user";
import {Nav} from "../../providers/nav";
import {Profile} from "../../providers/profile";
import {HomePage} from "../home/home";
import {IException} from "../../interfaces/exception";
import {RegisterPage} from "../register/register";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  email: string = '';
  password: string = '';
  error: string = null;

  constructor(
    public nav: Nav,
    public api: Api
  ) {

  }

  register() {
    this.nav.root(RegisterPage);
  }

  forgotPassword() {
    this.nav.root(ForgotPasswordPage);
  }


  auth() {

    this.api
      .auth(this.email, this.password)
      .then((user: IUser) => {
        Profile.set(user);
        this.nav.root(HomePage);
      })
      .catch((e: IException) => {
        this.error = e.message;
      })
  }
}
