import {Component} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {Profile} from "../../providers/profile";
import {Api} from "../../providers/api";
import {Modal} from "../../providers/modal";
import {IPayment} from "../../interfaces/payment";
import {Cart} from "../../providers/cart";
import {IHistory} from "../../interfaces/history";
import {Config} from "../../config";
import {WayForPay} from "../../providers/wayforpay";

@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})

export class PaymentsPage {

  public user: IUser = null;

  public payments: Array<IPayment> = [];
  public history: Array<IHistory> = [];

  public sum: number = Config.payment.defaultSum;
  public minSum: number = Config.payment.minimumSum;

  constructor(
    public api: Api,
    public modal: Modal,
    public cart: Cart,
    public wayForPay: WayForPay
  ) {
    Profile.listen((user: IUser) => {
      this.user = user;
    });

    this.api.payments().then((payments: Array<IPayment>) => {
      this.payments = payments;
    });

    this.api.history().then((history: Array<IHistory>) => {
      this.history = history;
    });
  }

  charge() {

    if (this.sum < this.minSum) {
      this.modal.message('Минимальная сумма пополнения: ' + this.minSum + ' грн');
      return;
    }

    this.wayForPay.pay(this.sum)

      .then(() => {
        this.modal.message('Отлично! Покупка успешно совершена.');
      })
      .catch(() => {
        this.modal.error('Упс... Что-то пошло не так.');
      });
  }
}
