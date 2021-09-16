import {Injectable} from '@angular/core';
import {AlertController, ModalController} from 'ionic-angular';

@Injectable()

export class Modal {

  constructor(
    private modal: ModalController,
    public alert: AlertController
  ) {
  }

  public message(message, callback?) {

    let alert = this.alert.create({
      title: 'Сообщение',
      subTitle: message,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          if (callback) {
            callback();
          }
        }
      }]
    });

    alert.present();
  }

  public confirm(message, ok?, cancel?) {

    let alert = this.alert.create({
      title: 'Подтвердите действие',
      subTitle: message,
      buttons: [
        {
          text: 'Нет',
          role: 'cancel',
          handler: () => {
            if (cancel) cancel();
          }
        },
        {
          text: 'Да',
          handler: () => {
            if (ok) ok();
          }
        }]
    });

    alert.present();
  }

  public error(message, callback?) {

    let alert = this.alert.create({
      title: 'Сообщение',
      subTitle: message,
      cssClass: 'error',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          if (callback) {
            callback();
          }
        }
      }]
    });

    alert.present();
  }

  public page(page, params?, options?) {
    let modal = this.modal.create(page, params, options);
    modal.present();
  }
}
