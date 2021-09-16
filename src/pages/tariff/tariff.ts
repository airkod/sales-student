import {Component} from '@angular/core';
import {ETariffType, ITariff} from "../../interfaces/tariff";
import {IUser} from "../../interfaces/user";
import {Api} from "../../providers/api";
import {Profile} from "../../providers/profile";
import {Cart} from "../../providers/cart";
import {Modal} from "../../providers/modal";

@Component({
  selector: 'page-tariff',
  templateUrl: 'tariff.html',
})

export class TariffPage {

  tariffs: Array<ITariff> = [];
  user: IUser = null;

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
    public modal: Modal
  ) {
    this.api.tariff().then((tariffs: Array<ITariff>) => {
      this.tariffs = tariffs;
    });

    Profile.listen((user: IUser) => {
      this.user = user;
    });
  }

  buy(tariff: ITariff) {

    if (!this.user.tariff) {

      this.cart.buyTariff(tariff).then(() => {
        this.modal.message('Вы успешно приобрели курс! Занятия Вам будет доступны по мере их актуальности!');
      });

      return;
    }

    if (
      (this.user.tariff.type == ETariffType.Base &&
        (tariff.type == ETariffType.Advanced || tariff.type == ETariffType.Expert))
      || (this.user.tariff.type == ETariffType.Advanced && tariff.type == ETariffType.Expert)
    ) {
      this.confirm(tariff);
      return;
    }

    this.modal.message('Вы не можете перейти на этот тарифный план');
  }

  confirm(tariff: ITariff) {

    this.cart
      .reBuyTariff(tariff)
      .then(() => {
        this.modal.message('Отлично! Вы успешно приобрели новый тирифный план!');
      })
      .catch(() => {
        this.modal.message('Упс... Что-то пошло нет так!');
      });
  }
}
