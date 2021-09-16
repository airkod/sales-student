import {SafeHtml} from "@angular/platform-browser";
import {ITeacher} from "./teacher";

export interface IChat {
  from?: string,
  message?: string | SafeHtml,
  dateTime?: number,
  files?: Array<string>,
  teacher?: ITeacher;
}
