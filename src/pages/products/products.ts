import {Component} from '@angular/core';
import {Api} from "../../providers/api";
import {IProduct} from "../../interfaces/product";
import {Cart} from "../../providers/cart";
import {Modal} from "../../providers/modal";

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})

export class ProductsPage {

  products: Array<IProduct> = [];

  constructor(
    public api: Api,
    public cart: Cart,
    public modal: Modal
  ) {
    this.api.products().then((products: Array<IProduct>) => {
      this.products = products;
    });
  }

  buy(product: IProduct) {

    this.cart.buyProduct(product)
      .then(() => {
        this.modal.message('Отлично! Мы с Вами скоро свяжемся!');
      })
      .catch(() => {
        this.modal.error('Упс... Что-то пошло не так!');
      });
  }
}
