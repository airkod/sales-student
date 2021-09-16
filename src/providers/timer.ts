import {isNumeric} from "rxjs/util/isNumeric";
import {isBoolean} from "ionic-angular/util/util";
import {isFunction} from "rxjs/util/isFunction";

interface ITimer {
  delay?: number,
  fireImmediately?: boolean,
  func: Function
}

export class Timer {

  public static destroy(instance: any) {

    if (instance) {

      clearTimeout(instance);
      clearInterval(instance);
      clearImmediate(instance);
    }
  }

  public static timeout(arg1?, arg2?, arg3?): number {
    let options = Timer.getTimerOptions(arg1, arg2, arg3);
    return setTimeout(options.func, options.delay);
  }

  public static interval(arg1?, arg2?, arg3?): number {
    let options = Timer.getTimerOptions(arg1, arg2, arg3);
    return setInterval(options.func, options.delay);
  }

  public static immediate(func: Function): number {
    return setImmediate(func);
  }

  private static getTimerOptions(arg1?, arg2?, arg3?): ITimer {

    let delay = 0;
    if (isNumeric(arg1)) delay = arg1;
    else if (isNumeric(arg2)) delay = arg2;
    else if (isNumeric(arg3)) delay = arg3;

    let fireImmediately = false;
    if (isBoolean(arg1)) fireImmediately = arg1;
    else if (isBoolean(arg2)) fireImmediately = arg2;
    else if (isBoolean(arg3)) fireImmediately = arg3;

    let func = null;
    if (isFunction(arg1)) func = arg1;
    else if (isFunction(arg2)) func = arg2;
    else if (isFunction(arg3)) func = arg3;

    if (fireImmediately && func) {
      func();
    }

    return {
      delay: delay,
      fireImmediately: fireImmediately,
      func: func
    };
  }
}
