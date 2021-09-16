import {Component} from '@angular/core';
import {Api} from "../../providers/api";
import {LoginPage} from "../login/login";
import {IUser} from "../../interfaces/user";
import {IException} from "../../interfaces/exception";
import {Nav} from "../../providers/nav";
import {Profile} from "../../providers/profile";
import {HomePage} from "../home/home";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  data: any = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };
  errors: any = [];

  constructor(
    public nav: Nav,
    public api: Api
  ) {

  }

  register() {

    this.api
      .register(this.data)
      .then((user: IUser) => {
        Profile.set(user);
        this.nav.root(HomePage);
      })
      .catch((e: IException) => {
        this.errors = e.errors;
      });

  }

  canSubmit(): boolean {

    return (
      this.data.name.length &&
      this.data.email.length &&
      this.data.password.length
    );
  }

  auth() {
    this.nav.root(LoginPage);
  }

  forgotPass() {
    this.nav.root(ForgotPasswordPage);
  }
}
