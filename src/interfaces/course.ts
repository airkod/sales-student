import {SafeHtml} from "@angular/platform-browser";

export interface ICourse {
  title?: string,
  description?: string,
  content?: string | SafeHtml
}
