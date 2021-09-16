import {Component} from '@angular/core';
import {Api} from "../../providers/api";
import {IAdditional} from "../../interfaces/additional";
import {NavParams} from "ionic-angular";
import {Helper} from "../../providers/helper";

@Component({
  selector: 'page-additional',
  templateUrl: 'additional.html',
})

export class AdditionalPage {

  additional: IAdditional;
  additionals: Array<IAdditional> = [];

  constructor(
    public api: Api,
    public params: NavParams
  ) {
    this.update(params.get('additional'));
  }

  update(additional: IAdditional = null) {

    if (additional) {
      this.selectAdditional(additional);
    }

    this.api.additional().then((additionals: Array<IAdditional>) => {

      this.additionals = additionals;

      if (this.additionals.length) {
        this.additional = this.additionals[0];
      }
    });
  }

  selectAdditional(additional: IAdditional) {
    this.additional = additional;
    Helper.scrollToContent();
  }
}
