import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Cache} from "./cache";
import {Loader} from "./loader";
import {Config} from "../config";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Profile} from "./profile";
import {IUser} from "../interfaces/user";
import {INotification} from "../interfaces/notification";
import {ILesson} from "../interfaces/lesson";
import {Form} from "./form";
import {IAdditional} from "../interfaces/additional";
import {IProduct} from "../interfaces/product";
import {ITariff} from "../interfaces/tariff";
import {IHomeTask} from "../interfaces/home-task";
import {IChat} from "../interfaces/chat";

@Injectable()

export class Api {

  headers: any = {};
  user: IUser;

  constructor(
    public http: HttpClient
  ) {
    Profile.listen((user: IUser) => {
      this.user = user;
      this.headers = {'x-user': user.id};
    });
  }

  /////////////////////////////////////////////////////////////////////////
  // Accounting
  /////////////////////////////////////////////////////////////////////////

  auth(email: string, password: string) {
    return this.post(`account/auth`, {
      email: email,
      password: password
    });
  }

  register(data) {
    return this.post(`account/register`, data);
  }

  forgotPassword(email: string) {
    return this.post(`account/forgotPassword`, {email: email});
  }

  profile(data) {
    return this.post(`user/update`, data);
  }

  getProfile() {
    return this.get(`user`, {}, false, false);
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.post(`user/password`, {
      'old-password': oldPassword,
      'new-password': newPassword
    });
  }

  updateToken(token: string) {
    return this.post(`user/deviceToken`, {token: token}, false);
  }


  /////////////////////////////////////////////////////////////////////////
  // Payments
  /////////////////////////////////////////////////////////////////////////

  charge(sum: number, productType, product) {
    return this.get(`order/charge`, {sum: sum, productType: productType, product: product}, false);
  }

  buyTariff(tariff: ITariff) {
    return this.post(`order/buyTariff`, {tariff: tariff.type});
  }

  reBuyTariff(tariff: ITariff) {
    return this.post(`order/reBuyTariff`, {tariff: tariff.type});
  }

  buyAdditional(additional: IAdditional) {
    return this.post(`order/buyAdditional`, {additional: additional.id});
  }

  buyProduct(product: IProduct) {
    return this.post(`order/buyProduct`, {product: product.id});
  }

  payments() {
    return this.get(`order/payments`, {}, false, false);
  }

  history() {
    return this.get(`order/history`, {}, false, false);
  }


  /////////////////////////////////////////////////////////////////////////
  // Notifications
  /////////////////////////////////////////////////////////////////////////

  notifications() {
    return this.get(`notification`, {}, false, false);
  }

  notification(notification: INotification) {
    return this.get(`notification/item`, {notificationId: notification});
  }

  maskAsRead(notification: INotification) {
    return this.get(`notification/maskAsRead`, {id: notification.id}, false, false);
  }

  /////////////////////////////////////////////////////////////////////////
  // Material
  /////////////////////////////////////////////////////////////////////////

  tariff() {
    return this.get(`material/tariff`);
  }

  course() {
    return this.get(`material/course`);
  }

  lessons() {
    return this.get(`material/lessons`);
  }

  additional() {
    return this.get(`material/additional`);
  }

  webinar() {
    return this.get(`material/webinar`);
  }

  submitHomeTask(lesson: ILesson, answer: string, files: Array<File> = []) {

    if (!files.length) {
      return this.post(`material/submitHomeTask`, {lesson: lesson.id, answer: answer}, false);
    }

    return new Promise((resolve, reject) => {

      this.upload(files).then((files: Array<string>) => {

        this.post(`material/submitHomeTask`, {lesson: lesson.id, answer: answer, files: files}, false).then((homeTask: IHomeTask) => {

          resolve(homeTask);

        }).catch(() => {
          reject();
        });

      }).catch(() => {

        reject();
      });
    });
  }

  homeTask(lesson: ILesson) {
    return this.get(`material/homeTask`, {lesson: lesson.id}, false);
  }

  /////////////////////////////////////////////////////////////////////////
  // Files
  /////////////////////////////////////////////////////////////////////////

  upload(files: Array<File>) {

    return new Promise((resolve, reject) => {

      let body = Form.convert({
        files: files,
        path: Config.fs.path,
        folder: this.user.id
      });

      this.http

        .post(Config.fs.url, body)

        .subscribe(
          (response: any) => {

            if (response.success) {
              resolve(response.files);
              return;
            }

            reject();
          },

          (error: any) => {
            if (error.error) {
              reject(error.error);
              return;
            }

            reject();
          }
        );
    });
  }

  /////////////////////////////////////////////////////////////////////////
  // Chat
  /////////////////////////////////////////////////////////////////////////

  chat() {
    return this.get(`chat`, {}, false, false);
  }

  chatMessage(message: string, files: Array<File> = []) {

    if (!files.length) {
      return this.post(`chat/message`, {message: message}, false);
    }

    return new Promise((resolve, reject) => {

      this.upload(files).then((files: Array<string>) => {

        this.post(`chat/message`, {message: message, files: files}, false).then((message: IChat) => {

          resolve(message);

        }).catch(() => {
          reject();
        });

      }).catch(() => {

        reject();
      });
    });
  }

  /////////////////////////////////////////////////////////////////////////
  // Product
  /////////////////////////////////////////////////////////////////////////

  products() {
    return this.get(`product`, {}, false);
  }

  /////////////////////////////////////////////////////////////////////////


  get(endpoint?: string, params?: any, cached: boolean = true, loader: boolean = true) {

    return new Promise((resolve, reject) => {

      if (cached && Config.api.cache) {

        let cacheKey = endpoint + JSON.stringify(params || {}) + this.user.id + JSON.stringify(this.user.tariff);

        let cached = Cache.get(cacheKey);

        if (cached) {
          resolve(cached);
          return;
        }
      }

      if (loader) {
        Loader.show();
      }

      this.http

        .get(Config.api.endpoint + '/' + endpoint, {
          params: params,
          headers: new HttpHeaders(this.headers),
          observe: "response"
        })

        .subscribe(
          (response: HttpResponse<any>) => {

            this.setUser(response);
            this.setNotifications(response);

            if (cached && Config.api.cache) {
              let cacheKey = endpoint + JSON.stringify(params || {}) + this.user.id + JSON.stringify(this.user.tariff);
              Cache.set(cacheKey, response.body);
            }

            if (loader) {
              Loader.hide();
            }

            resolve(response.body);
          },

          (error: HttpErrorResponse) => {
            Loader.hide();
            reject(error.error.error);
          }
        );
    });
  }

  post(endpoint: string, body: any = {}, loader: boolean = true) {

    return new Promise((resolve, reject) => {

      if (loader) {
        Loader.show();
      }

      body = Form.convert(body);

      this.http

        .post(Config.api.endpoint + '/' + endpoint, body, {
          headers: new HttpHeaders(this.headers),
          observe: "response"
        })

        .subscribe(
          (response: HttpResponse<any>) => {

            this.setUser(response);
            this.setNotifications(response);

            if (loader) {
              Loader.hide();
            }

            resolve(response.body);
          },

          (response: HttpErrorResponse) => {

            if (loader) {
              Loader.hide();
            }

            if (response.error) {
              reject(response.error);
              return;
            }
            reject();
          }
        );
    });
  }

  setUser(response: HttpResponse<IUser>) {

    let user = JSON.parse(response.headers.get('x-user'));

    if (user) {
      Profile.set(user);
    }
  }

  setNotifications(response: HttpResponse<any>) {

    let notifications = JSON.parse(response.headers.get('x-notifications'));

    if (notifications) {
      Profile.setNotifications(notifications);
    }
  }
}
