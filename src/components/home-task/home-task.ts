import {Component, Input} from '@angular/core';
import {ILesson} from "../../interfaces/lesson";
import {IHomeTask} from "../../interfaces/home-task";
import {Api} from "../../providers/api";
import {Modal} from "../../providers/modal";
import {IException} from "../../interfaces/exception";
import {Loader} from "../../providers/loader";
import {IUser} from "../../interfaces/user";
import {Profile} from "../../providers/profile";

@Component({
  selector: 'home-task',
  templateUrl: 'home-task.html'
})

export class HomeTaskComponent {

  user: IUser;
  homeTask: IHomeTask = null;

  @Input('lesson') lesson: ILesson = {};

  constructor(
    public api: Api,
    public modal: Modal
  ) {
    Profile.listen((user: IUser) => {
      this.user = user;
    });
  }

  ngOnChanges() {

    if (this.user.tariff) {
      this.api.homeTask(this.lesson).then((homeTask: IHomeTask) => {
        this.homeTask = homeTask;
      });
    }
  }

  submit(event) {

    this.modal.confirm('Отправить ответ на проверку?', () => {

      Loader.show();

      this.api.submitHomeTask(this.lesson, event.message, event.files)

        .then((homeTask: IHomeTask) => {

          Loader.hide();

          this.homeTask = homeTask;
          this.modal.message('Отлично! Вы успешно отправили на проверку домашнее задание.');
        })

        .catch((e: IException) => {
          Loader.hide();
          this.modal.error('Упс... Что-то пошло не так. Попробуйте повторить попытку позже.');
        });
    });
  }
}
