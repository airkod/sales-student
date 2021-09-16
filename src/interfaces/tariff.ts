import {SafeHtml} from "@angular/platform-browser";

export enum ETariffType {
  Base = 'base',
  Advanced = 'advanced',
  Expert = 'expert'
}

export interface ITariff {
  type?: ETariffType,
  title?: string,
  description?: string | SafeHtml,
  price?: number,
  popular?: boolean
}
