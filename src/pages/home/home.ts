import {Component} from '@angular/core';
import {Api} from "../../providers/api";
import {ILesson} from "../../interfaces/lesson";
import {Firebase} from "../../providers/firebase";
import {NavParams} from "ionic-angular";
import {Helper} from "../../providers/helper";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public lesson: ILesson;
  public lessons: Array<ILesson>;

  constructor(
    public api: Api,
    public params: NavParams
  ) {
    Firebase.getToken().then((token: string) => {
      this.api.updateToken(token);
    }).catch((e) => {
    });

    this.selectLesson(params.get('lesson'));

    this.api.lessons().then((lessons: Array<ILesson>) => {
      this.lessons = lessons;
    });
  }

  selectLesson(lesson: ILesson = null) {

    if (lesson) {
      this.lesson = lesson;
      Helper.scrollToContent();
    }
  }
}
