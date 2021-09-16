import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat',
})

export class DateFormatPipe implements PipeTransform {

  public monthDefaults: Array<string> = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ];

  transform(value: number, ...args) {

    let format = args[0] || 'd mmm';
    let date = new Date(value * 1000);

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (hours.length == 1) {
      hours = '0' + hours;
    }

    if (minutes.length == 1) {
      minutes = '0' + minutes;
    }

    return format
      .split('{day}').join(date.getDate())
      .split('{month}').join(this.monthDefaults[date.getMonth()])
      .split('{year}').join(date.getFullYear())
      .split('{hour}').join(hours)
      .split('{minute}').join(minutes);
  }
}
