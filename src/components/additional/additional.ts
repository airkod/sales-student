import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAdditional} from "../../interfaces/additional";
import {Cart} from "../../providers/cart";
import {IException} from "../../interfaces/exception";
import {Modal} from "../../providers/modal";

@Component({
  selector: 'additional',
  templateUrl: 'additional.html'
})

export class AdditionalComponent {

  @Input('additional') additional: IAdditional = null;

  @Output() onUpdate = new EventEmitter();

  constructor(
    public cart: Cart,
    public modal: Modal
  ) {

  }

  buy() {

    this.cart

      .buyAdditional(this.additional)

      .then((additional: IAdditional) => {

        if (additional) {
          this.additional = additional;
          this.onUpdate.emit(this.additional);
        }

        this.modal.message('Отлично! Дополнительный материал скоро будет Вам доступен.');
      })

      .catch((e: IException) => {
        this.modal.error(e.message);
      });
  }
}
