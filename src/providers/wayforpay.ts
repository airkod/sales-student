import {Api} from "./api";
import {Injectable} from "@angular/core";

@Injectable()

export class WayForPay {

  constructor(public api: Api) {

  }

  public pay(sum: number, productType = 'charge', product = false) {

    return new Promise((resolve, reject) => {

      var wayforpay = new (<any>window).Wayforpay();

      this.api.charge(sum, productType, product).then((settings) => {

        wayforpay.run(settings,
          (response) => {
            resolve(response);
          },
          (response) => {
            reject(response);
          },
          (response) => {
            resolve(response);
          }
        );
      });
    });
  }
}
