import {SafeHtml} from "@angular/platform-browser";

export interface IAdditional {
  id?: string,
  title?: string,
  description?: string | SafeHtml,
  advertisingDescription?: string,
  webinar?: string | SafeHtml,
  file?: string,
  price?: number,
  active?: boolean
}
