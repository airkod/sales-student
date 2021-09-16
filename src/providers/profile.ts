import {IUser} from "../interfaces/user";
import {Storage} from "./storage";
import {INotification} from "../interfaces/notification";

export class Profile {

  private static events = {updated: [], signOut: [], notifications: []};

  public static set(user: IUser, fireEvent: boolean = true): void {

    Storage.set('user', user);

    if (fireEvent) {
      this.fire(this.events.updated, user);
    }
  }

  public static get(): IUser {
    return Storage.get('user');
  }

  public static setNotifications(notifications: Array<INotification>) {
    Storage.set('notifications', notifications);
    this.fire(this.events.notifications, notifications);
  }

  public static getNotifications() {
    return Storage.get('notifications');
  }

  public static isLoggedIn(): boolean {
    return Storage.check('user');
  }

  public static logout(): void {
    Storage.remove('user');
    this.fire(this.events.signOut);
  }

  public static listen(func: Function) {

    this.events.updated.push(func);

    let user = this.get();

    if (user) {
      func(user);
    }
  }

  public static signOut(func: Function) {
    this.events.signOut.push(func);
  }

  public static notifications(func: Function) {

    this.events.notifications.push(func);

    let notifications = this.getNotifications();

    if (notifications) {
      func(notifications);
    }
  }

  public static isSterling() {
    let user = this.get();
    return user && user.tariff && user.tariff.type != 'base';
  }

  private static fire(event: Array<Function> = [], param: any = null) {
    event.forEach((func) => {
      func(param);
    });
  }
}
