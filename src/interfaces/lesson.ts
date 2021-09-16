import {SafeHtml} from "@angular/platform-browser";

export interface ILesson {
  id?: string,
  title?: string,
  description?: string | SafeHtml,
  start?: number,
  webinar?: string | SafeHtml,
  file?: string,
  active?: boolean,
  hasChat?: boolean,
  hasHomeTask?: boolean,
  notification?: boolean,
  homeTask?: string
}
