import {Profile} from "./profile";
import {Api} from "./api";
import {IUser} from "../interfaces/user";
import {Injectable} from "@angular/core";
import {IException} from "../interfaces/exception";
import {IAdditional} from "../interfaces/additional";
import {IProduct} from "../interfaces/product";
import {ITariff} from "../interfaces/tariff";
import {WayForPay} from "./wayforpay";

@Injectable()

export class Cart {

  user: IUser = null;

  constructor(
    public api: Api,
    public wayForPay: WayForPay
  ) {
    Profile.listen((user: IUser) => {
      this.user = user;
    });
  }

  buyAdditional(additional: IAdditional) {

    return new Promise((resolve, reject) => {

      if (additional.price > this.user.bonus) {

        this.charge(additional.price - this.user.bonus, 'additional', additional.id)

          .then(() => {
            resolve();
          })

          .catch((e: IException = null) => {
            reject(e);
          });

        return;
      }

      this.api.buyAdditional(additional)
        .then((additional: IAdditional) => {
          resolve(additional);
        })
        .catch((e: IException = null) => {
          reject(e);
        });
    });
  }

  buyProduct(product: IProduct) {

    return new Promise((resolve, reject) => {

      if (product.price > this.user.bonus) {

        this.charge(product.price - this.user.bonus, 'product', product.id)

          .then(() => {
            resolve();
          })

          .catch((e: IException = null) => {
            reject(e);
          });

        return;
      }

      this.api.buyProduct(product)
        .then(() => {
          resolve();
        })
        .catch((e: IException = null) => {
          reject(e);
        });
    });
  }

  buyTariff(tariff: ITariff) {

    return new Promise((resolve, reject) => {

      if (tariff.price > this.user.bonus) {

        this.charge(tariff.price - this.user.bonus, 'tariff', tariff.type)

          .then(() => {
            resolve();
          })

          .catch((e: IException = null) => {
            reject(e);
          });

        return;
      }

      this.api.buyTariff(tariff)
        .then(() => {
          resolve();
        })
        .catch((e: IException = null) => {
          reject(e);
        });

    });
  }

  reBuyTariff(tariff: ITariff) {

    return new Promise((resolve, reject) => {

      if (tariff.price - this.user.tariff.price > this.user.bonus) {

        this.charge(tariff.price - this.user.tariff.price - this.user.bonus, 'tariff', tariff.type)

          .then(() => {
            resolve();
          })

          .catch((e: IException = null) => {
            reject(e);
          });

        return;
      }

      this.api.reBuyTariff(tariff)
        .then(() => {
          resolve();
        })
        .catch((e: IException = null) => {
          reject(e);
        });

    });
  }

  charge(sum, productType, product) {

    return new Promise((resolve, reject) => {

      this.wayForPay.pay(sum, productType, product)

        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }
}
