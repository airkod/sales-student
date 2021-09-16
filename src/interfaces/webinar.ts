import {SafeHtml} from "@angular/platform-browser";

export interface IWebinar {
  id?: string,
  title?: string,
  description?: string | SafeHtml,
  start?: number,
  active: boolean,
  link?: boolean
}
