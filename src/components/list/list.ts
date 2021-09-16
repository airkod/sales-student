import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IList} from "../../interfaces/list";

@Component({
  selector: 'list',
  templateUrl: 'list.html'
})

export class ListComponent {

  @Input('items') items: Array<IList> = [];
  @Input('title') title: string = '';
  @Input('item') activeItem: IList = null;

  @Output() onSelect = new EventEmitter();

  select(item: IList) {
    this.activeItem = item;
    this.onSelect.emit(item);
  }
}
