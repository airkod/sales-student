import {Config} from "../config";

export class Cache {

  static set(key: string, value) {

    if (!Config.cache.enabled) {
      return;
    }

    key = Cache.key(key);

    localStorage.setItem(key, JSON.stringify(value));

    let time = new Date().getTime() + Config.cache.lifetime;
    localStorage.setItem(`${key}-time`, JSON.stringify(time));
  }

  static get(key: string) {

    try {
      if (!Config.cache.enabled) {
        return null;
      }

      key = Cache.key(key);

      let item = localStorage.getItem(key);
      let time = +localStorage.getItem(`${key}-time`) || -1;

      if (time === -1) {
        return JSON.parse(item);
      }

      if (new Date().getTime() > time) {
        return null;
      }

      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }

  static remove(key: string) {
    return localStorage.removeItem(Cache.key(key));
  }

  static clear() {

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).substr(0, Config.cache.namespace.length) == Config.cache.namespace) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
  }

  private static key(key: string) {
    return Config.cache.namespace + ':' + key;
  }
}
