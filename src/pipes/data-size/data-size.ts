import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataSize',
})

export class DataSizePipe implements PipeTransform {

  transform(value: number, ...args) {

    switch (args[0]) {

      case 'kb':
        return Math.ceil(value / 1024) + ' Кб';

      case 'mb':
        return Math.ceil(value / 1024 / 1024) + ' Мб';

      default:
        return value;
    }
  }
}
