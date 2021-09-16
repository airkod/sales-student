import {NgModule} from '@angular/core';
import {DateFormatPipe} from './date-format/date-format';
import {DataSizePipe} from './data-size/data-size';

@NgModule({
  declarations: [
    DateFormatPipe,
    DataSizePipe,
  ],
  imports: [],
  exports: [
    DateFormatPipe,
    DataSizePipe,
  ]
})

export class PipesModule {
}
