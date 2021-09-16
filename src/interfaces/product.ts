import {SafeHtml} from "@angular/platform-browser";

export interface IProduct {
  id?: string;
  title?: string;
  image?: string;
  description?: string | SafeHtml,
  smallDescription?: string,
  price?: number
}
