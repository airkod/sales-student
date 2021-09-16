import {Component} from '@angular/core';
import {IChat} from "../../interfaces/chat";
import {Api} from "../../providers/api";
import {Timer} from "../../providers/timer";
import {Loader} from "../../providers/loader";
import {Modal} from "../../providers/modal";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {

  messages: Array<IChat> = [];
  updateInterval: number = 0;

  constructor(
    public api: Api,
    public modal: Modal
  ) {
    this.updateInterval = Timer.interval(10000, true, () => {
      this.api.chat().then((messages: Array<IChat>) => {
        this.messages = messages;
      });
    });
  }

  submit(message) {

    Loader.show();

    this.api
      .chatMessage(message.message, message.files)
      .then((message: IChat) => {
        Loader.hide();
        this.messages.push(message);
      })
      .catch(() => {
        Loader.hide();
        this.modal.message('Упс.. Неудалось отправить сообщение!');
      });
  }

  ngOnDestroy() {
    Timer.destroy(this.updateInterval);
  }
}
