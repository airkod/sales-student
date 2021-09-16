import {Component} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {ICourse} from "../../interfaces/course";
import {Api} from "../../providers/api";
import {Profile} from "../../providers/profile";
import {ITariff} from "../../interfaces/tariff";
import {Cart} from "../../providers/cart";
import {Modal} from "../../providers/modal";
import {Nav} from "../../providers/nav";

@Component({
  selector: 'buy-course',
  templateUrl: 'buy-course.html'
})

export class BuyCourseComponent {

  user: IUser;
  course: ICourse;
  tariffs: Array<ITariff>;

  texts: Array<string> = [
    'Полный доступ к 30+ занятиям в кабинете',
    'Методически материалы (с примерами и скриптами)',
    'Диплом об окончании “Школы высокооплачиваемых продавцов” ',
    'Доступ к занятиям 3 месяца после окончания курса',
    '4 вебинара с живой обратной связью от тренеров',
    'Сопровождение персонального тьютора 24/7',
    'Проверка домашних заданий лично тренерами, ответы на вопросы',
    'Анализ аудио-записей ваших звонков тьютором (с персональной обратной связью по чек-листу). ',
    'Доступ в закрытую группу поддержки Телеграмм',
    'Возможность зарабатывать баллы и получать за них ценные бонусы',
    'Возможность получить доступ к 3-м секретным видео',
    'Анализ аудио-записей ваших звонков лично тренерами (с персональной обратной связью по чек-листу). ',
    '2 индивидуальные коуч-сессии с тренерами. Разбор ошибок, рекомендации.  ',
    'Гарантированный доступ к 3-м секретным видео.'
  ];

  indexes: Object = {
    'base': 4,
    'advanced': 11,
    'expert': 50
  };

  constructor(
    public api: Api,
    public cart: Cart,
    public modal: Modal,
    public nav: Nav
  ) {
    Profile.listen((user: IUser) => {
      this.user = user;
    });

    if (!this.user.tariff) {

      this.api.course().then((course: ICourse) => {
        this.course = course;
      });

      this.api.tariff().then((tariffs: Array<ITariff>) => {
        this.tariffs = tariffs;
      });
    }
  }

  buy(tariff: ITariff) {

    this.cart

      .buyTariff(tariff)

      .then(() => {

        if (tariff.type == 'base') {

          this.modal.message('Вы успешно приобрели курс! Занятия скоро будут Вам доступны!', () => {
            this.nav.reload();
          });

          return;
        }

        this.modal.message('Вы успешно приобрели курс! Занятия Вам будет доступны по мере их актуальности!', () => {
          this.nav.reload();
        });
      })

      .catch(() => {
        this.modal.error('Упс... Что-то пошло не так!');
      });
  }
}
