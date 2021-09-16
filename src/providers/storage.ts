import {Base64} from "./base64";
import {Config} from "../config";

export class Storage {

  public static get(key: string) {

    let value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(Base64.decode(value));
    }

    return null;
  }

  public static set(key: string, value): void {
    return localStorage.setItem(key, Base64.encode(
      JSON.stringify(value)
    ));
  }

  public static check(key: string): boolean {
    return localStorage.getItem(key) != null;
  }

  public static remove(key: string) {
    return localStorage.removeItem(key);
  }

  public static clear(): void {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).substr(0, Config.cache.namespace.length) != Config.cache.namespace) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
  }
}
