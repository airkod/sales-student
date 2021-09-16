import {Injectable} from '@angular/core';
import {Storage} from "./storage";
import {Cache} from "./cache";

@Injectable()

export class Updates {

  constructor() {

    if (!Storage.check('updated')) {
      Cache.clear();
      Storage.set('updated', true);
    }
  }
}
