import {Component, Input} from '@angular/core';
import {Nav} from "../../providers/nav";
import {SettingsPage} from "../../pages/settings/settings";
import {PaymentsPage} from "../../pages/payments/payments";
import {Profile} from "../../providers/profile";
import {Storage} from "../../providers/storage";
import {LoginPage} from "../../pages/login/login";
import {Modal} from "../../providers/modal";
import {TariffPage} from "../../pages/tariff/tariff";

@Component({
  selector: 'cabinet-menu',
  templateUrl: 'cabinet-menu.html'
})

export class CabinetMenuComponent {

  @Input('selected') selected: string = 'settings';

  constructor(
    public nav: Nav,
    public modal: Modal
  ) {

  }

  go(page: string) {

    switch (page) {

      case 'settings':
        this.nav.root(SettingsPage);
        break;

      case 'payments':
        this.nav.root(PaymentsPage);
        break;

      case 'tariff':
        this.nav.root(TariffPage);
        break;
    }
  }

  logout() {
    this.modal.confirm('Вы действительно хотите выйти?', () => {
      Profile.logout();
      Storage.clear();
      this.nav.root(LoginPage);
    });
  }
}
